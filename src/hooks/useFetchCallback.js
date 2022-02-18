import React, { useCallback } from 'react';
import { STATUS, generateConfig } from 'common';

const useFetchCallback = (url, method = 'GET', body = undefined) => {
    const [state, setState] = React.useState({
        status: STATUS.IDLE,
        data: null,
        error: null
    });

    const callback = useCallback(
        async (params = undefined) => {
            setState({ status: STATUS.PENDING });

            return fetch(
                `${url}${typeof params === 'string' ? `/${params}` : ''}`,
                generateConfig(method, body)
            )
                .then((data) => {
                    if (data.status >= 300) {
                        throw new Error(
                            `Fetch failed with status ${data.status}`
                        );
                    }

                    return data.json();
                })
                .then((data) => {
                    setState({ status: STATUS.RESOLVED, data });
                })
                .catch((err) =>
                    setState({ status: STATUS.REJECTED, error: err.message })
                );
        },
        [url, method, body]
    );

    return [callback, state];
};

export { useFetchCallback };
