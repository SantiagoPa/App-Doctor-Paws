import { useEffect } from 'react';

const STATUS_VALID = [200,201,203,204]

export const useAsync = (
    asyncFn: () => Promise<{
        result: any;
        status: number;
    } | undefined>,
    successFunction: Function,
    returnFunction: Function,
    dependencies: any[] = []
) => {

    useEffect(() => {
        let isActive = true;
        if (asyncFn !== undefined) {
            asyncFn().then((response) => {
                if (response) {
                    const { status, result } = response;
                    if (isActive && STATUS_VALID.includes(status)) successFunction(result);
                }
            });
        }
        return () => {
            returnFunction && returnFunction();
            isActive = false;
        };
    }, dependencies);
};

