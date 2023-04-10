namespace WebApi.Controllers.Dto
{
    public class AppExceptionDto
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Source { get; set; }
        public string StackTrace { get; set; }
    }
}
