package verb.exe;

import promhx.Promise;

class AsyncObject {
    public function defer<T>(   classType : Class<Dynamic>,
                                methodName : String,
                                args : Array<Dynamic>  ) : Promise<T> {
        return Dispatcher.dispatchMethod( classType, methodName, args );
    }
}
