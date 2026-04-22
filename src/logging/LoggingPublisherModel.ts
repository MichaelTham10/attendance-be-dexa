export interface LoggingPublisherModel {
    ServiceName : string | null;
    Endpoint : string;
    Method : string;
    RequestBody : any | null;
    RequestQuery : any | null;
    RequestParams : any | null;
    ResponseBody : any | null;
    StatusCode : number | null;
    DurationMs : number | null;
    Message : string | null;
    StackTrace : string | null ;
    UsrCrt: string;
    UsrUpd: string;
    DtmCrt: Date;
    DtmUpd: Date;
}