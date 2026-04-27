import { useEffect } from "react";

const STATUS_VALID = [200, 201, 203, 204];

type AsyncFn<T> = () => Promise<{ result: T; status: number }> | undefined;

export const useAsync = <T = any>(
    asyncFn: AsyncFn<T>,
    successFunction: (result: T) => void,
    returnFunction?: () => void,
    dependencies: any[] = []
) => {
    useEffect(() => {
        let isActive = true;

        const promise = asyncFn();

        promise?.then(({ result, status }) => {
            if (isActive && STATUS_VALID.includes(status)) {
                successFunction(result);
            }
        });

        return () => {
            returnFunction?.();
            isActive = false;
        };
    }, dependencies);
};