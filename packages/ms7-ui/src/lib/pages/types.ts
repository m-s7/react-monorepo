import { PageErrorDefaultProps, PageErrorProps } from './common/page-error'

export type ErrorComponent = Omit<PageErrorProps, 'text' | 'icon'> | Omit<PageErrorDefaultProps, 'text' | 'icon'>