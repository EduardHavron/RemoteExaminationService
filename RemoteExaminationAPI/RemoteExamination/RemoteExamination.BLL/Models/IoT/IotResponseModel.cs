using System;
using Newtonsoft.Json;

namespace RemoteExamination.BLL.Models.IoT
{
    public class IotResult
    {
        [JsonProperty("code")] public string Code { get; set; }

        [JsonProperty("data")] public Data Data { get; set; }

        [JsonProperty("executionId")] public Guid ExecutionId { get; set; }

        [JsonProperty("summary")] public string Summary { get; set; }
    }

    public class Data
    {
        [JsonProperty("durationTimeInSeconds")]
        public double DurationTimeInSeconds { get; set; }

        [JsonProperty("finishTime")] public DateTimeOffset FinishTime { get; set; }

        [JsonProperty("recognizer")] public string Recognizer { get; set; }

        [JsonProperty("result")] public Result Result { get; set; }

        [JsonProperty("startTime")] public DateTimeOffset StartTime { get; set; }

        [JsonProperty("taskId")] public long TaskId { get; set; }

        [JsonProperty("version")] public string Version { get; set; }

        [JsonProperty("workerId")] public long WorkerId { get; set; }
    }

    public class Result
    {
        [JsonProperty("alienNumber")] public string AlienNumber { get; set; }

        [JsonProperty("applicationReceiptNumber")]
        public string ApplicationReceiptNumber { get; set; }

        [JsonProperty("dateOfBirth")] public DateOf DateOfBirth { get; set; }

        [JsonProperty("dateOfExpiry")] public DateOf DateOfExpiry { get; set; }

        [JsonProperty("documentCode")] public string DocumentCode { get; set; }

        [JsonProperty("documentNumber")] public string DocumentNumber { get; set; }

        [JsonProperty("documentType")] public string DocumentType { get; set; }

        [JsonProperty("immigrantCaseNumber")] public string ImmigrantCaseNumber { get; set; }

        [JsonProperty("issuer")] public string Issuer { get; set; }

        [JsonProperty("mrtdVerified")] public bool MrtdVerified { get; set; }

        [JsonProperty("nationality")] public string Nationality { get; set; }

        [JsonProperty("opt1")] public string Opt1 { get; set; }

        [JsonProperty("opt2")] public string Opt2 { get; set; }

        [JsonProperty("primaryID")] public string PrimaryId { get; set; }

        [JsonProperty("rawMRZString")] public string RawMrzString { get; set; }

        [JsonProperty("secondaryID")] public string SecondaryId { get; set; }

        [JsonProperty("sex")] public string Sex { get; set; }

        [JsonProperty("type")] public string Type { get; set; }
    }

    public class DateOf
    {
        [JsonProperty("day")] public long Day { get; set; }

        [JsonProperty("month")] public long Month { get; set; }

        [JsonProperty("originalString")] public string OriginalString { get; set; }

        [JsonProperty("year")] public long Year { get; set; }
    }
}