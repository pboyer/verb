package verb.exe;

import promhx.Promise;

class AsyncObject {
    public function applyMethod<T>( classType : Class<Dynamic>,
                                    methodName : String,
                                    args : Array<Dynamic>  ) : Promise<T> {
        return Dispatcher.instance().applyMethod( Type.getClassName(classType), methodName, args );
    }
}
