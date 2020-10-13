export interface CONFIG {
    /** Unique server name to ensure multiple servers are not started for the same function */
    SERVER_NAME: string;
    /** User-id to run as. It is mandatory to use a user-id with least possible
    permissions to restrict hackers / buggy code to gain undue access to the system */
    RUN_AS: string;
    /** (optional)
      DEV  mode: defaults to 1
      PROD mode: defaults to total number of CPU cores */
    INSTANCES?: number;
}
