module.exports = class ResponseConstructor {
    status: number = 200;
    isSuccess: boolean = true;
    message:string = "success";
    data: any  = null;

    constructor({ message, data, isList, isDatatable, meta }: { message?: string; data: any; isList?: boolean, isDatatable?: boolean, meta?: any }) {
        if(message) this.message = message as string;

        if(data && isList !== true ) this.data = data;
        else if(data && isList === true ) this.data = { "list": data };

        if(isDatatable === true && meta) this.data = this.data ? {...this.data, meta} : this.data
    }

    failure(message?: string) {
        this.isSuccess = false;
        this.message = message && typeof message === "string" ? message : "There is something wrong";
        this.data = null;
        this.status = 422;

        return this;
    }
}