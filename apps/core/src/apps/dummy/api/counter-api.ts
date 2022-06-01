interface FetchCount { data: number }

export const fetchCount = (amount = 1): Promise<FetchCount> =>
    new Promise<FetchCount>(resolve =>
        setTimeout(() => resolve({ data: amount }), 500),
    )
