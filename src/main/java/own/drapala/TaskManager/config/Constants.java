package own.drapala.TaskManager.config;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^(?>[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)|(?>[_.@A-Za-z0-9-]+)$";

    public static final String SYSTEM = "system";
    public static final String DEFAULT_LANGUAGE = "en";
//    security.remember-me.key: 0b32a651e6a65d5731e869dc136fb301b0a8c0e4
    public static final String KEY =  "0b32a651e6a65d5731e869dc136fb301b0a8c0e4";
    public static final String POLICY = "default-src 'self'";
    private Constants() {}
}
