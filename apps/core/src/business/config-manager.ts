import yaml from 'js-yaml'
import FatalError from '@/business/models/errors/fatal-error'
import { isEmpty } from 'lodash'
import { CustomTypeDictionary } from '@/business/models/common'

type Config = CustomTypeDictionary<string | object | undefined>
type ConfigValue = string | undefined

export const getConfig = (): Config => new ConfigManager().config
export const getConfigValue = (root: string, key: string): ConfigValue => new ConfigManager().getConfigValue(root, key)

let instance: ConfigManager
export default class ConfigManager {
    private readonly file = '/config.yml'
    private _config: Config = {}

    constructor() {
        if(!instance) instance = this

        return instance
    }

    public get config(): Config {
        return this._config
    }

    public async loadConfig(): Promise<Config | undefined> {
        if(!isEmpty(this.config)) return this._config

        return await fetch(this.file, { method: 'GET' })
            .then(res => res.blob())
            .then(blob => blob.text())
            .then(text => {
                const yamlConfig: (string | Config) = (yaml.load(text) as (string | Config))
                if(typeof yamlConfig === 'string') throw new FatalError('Config', 'Invalid syntax or file does not exist')

                this.parseConfigValuesToEnv(yamlConfig)

                this._config = yamlConfig

                return yamlConfig
            })
    }

    public getConfigValue(rootKey: string, key: string): ConfigValue {
        if(!this.config) return

        const rootNode = this.config[rootKey]
        if(!rootNode) return

        let value
        if(typeof rootNode === 'object') {
            value = (rootNode as { [key: string]: string | object })[key]

            if(!value || typeof value === 'object') return
            else return value
        }
    }

    private parseConfigValuesToEnv(config: Config): void {
        Object.keys(config)
            .forEach(key => {
                const value = config[key]

                if(typeof value === 'object') this.parseConfigValuesToEnv((value as { [key: string]: object }))
                else if(typeof value === 'string') {
                    const regex = /\${([^}]+)}/gm
                    const matches = value.match(regex)
                    if(matches) {
                        matches.forEach((match: string) => {
                            config[key] = ConfigManager.replaceValue((config[key] as string), match)
                        })
                    }
                }
            })
    }

    private static replaceValue(configValue: string, value: string): string | undefined {
        const startCharacter = '${'
        const endCharacter = '}'

        if(!value) return value
        if(!value.startsWith(startCharacter) || !value.endsWith(endCharacter)) return undefined

        const search = value.replace(startCharacter, '').replace(endCharacter, '')

        const envValue = process.env[search]

        return (envValue ? configValue.replace(value, envValue) : undefined)
    }
}