import {HttpException, HttpStatus} from "@nestjs/common";


export class ControllerExceptions {
    notUndefinedPromise<T>(promise: Promise<T>, message: string): Promise<T> {
        return promise.then(
            it => {
                if (it === undefined) {
                    throw new HttpException('not found ' + message, HttpStatus.NOT_FOUND);
                }
                return it;
            }
        );
    }

    notUndefinedItem<T>(item: T, message: string): T {
        if (item === undefined) {
            throw new HttpException('not found ' + message, HttpStatus.NOT_FOUND);
        }
        return item;
    }

    // updateRe
}
