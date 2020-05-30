namespace RemoteExamination.Common.Exceptions.BLL
{
    public class NotFoundException : BusinessLogicException
    {
        public NotFoundException(string entity, object key) : base($"Entity '{entity}' with key '{key}' was not found")
        {
        }
    }
}