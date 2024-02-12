import {
    RetryOptions,
    retryAsync, 
} from "ts-retry";


/**
 * This function retries the callback until the provided function return a truthy value
 *
 * @export
 * @param {() => Promise<unknown>} fn
 * @param {Omit<RetryOptions, 'until'>} [options={
 *     delay: 100,
 *     maxTry: 5,
 *   }]
 * @return {*}
 */
export function retryUntil(
    fn : () => Promise<boolean>|boolean,
    options : Omit<RetryOptions, "until"> = {
        delay  : 100,
        maxTry : 10,
    },
) {
  
    return retryAsync(
        async () => {return fn();},
        {
            ...options,
            until: (result) => !!result,
        },
    );
  
}
