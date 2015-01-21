package verb.exe;

import promhx.Promise;

class AsyncObject {
    public function deferMethod<T>( classType : Class<Dynamic>,
                                    methodName : String,
                                    args : Array<Dynamic>  ) : Promise<T> {
        return Dispatcher.instance().deferMethod( Type.getClassName(classType), methodName, args );
    }
}
