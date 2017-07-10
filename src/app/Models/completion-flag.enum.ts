export enum CompletionFlag {
  All = 0,
  Completed = 1 << 0,
  InProgress = 1 << 1,
  NotCompleted = 1 << 2,
  Closed = 1 << 3,
  NotResolved = 1 << 4,
  NotSet = 1 << 5,
  OnGoingIssues = InProgress | NotCompleted | NotResolved
}
