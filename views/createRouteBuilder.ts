export const createRouteBuilder = <
    R extends string,
    RQ extends Record<R, unknown>,
>() => {
    return function (
        url: R,
        query: RQ[R] | undefined,
    ): { pathname: string; query: Partial<RQ[R]> } {
        let resultUrl = String(url);

        const notRouteQuery: Partial<RQ[R]> = {};

        if (typeof query === 'object') {
            for (const q in query) {
                // @ts-ignore
                const value = query[q];

                if (value !== undefined && value !== null) {
                    if (url.includes(`:${q}`)) {
                        resultUrl = String(resultUrl).replace(
                            new RegExp(`:${q}`, 'g'),
                            String(value),
                        );
                    } else {
                        notRouteQuery[q] = value;
                    }
                }
            }
        }

        return { pathname: resultUrl, query: notRouteQuery };
    };
};
