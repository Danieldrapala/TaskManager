package own.drapala.TaskManager.config;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^(?>[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)|(?>[_.@A-Za-z0-9-]+)$";

    public static final String SYSTEM = "system";
    public static final String DEFAULT_LANGUAGE = "en";
//  security.remember-me.key: 0b32a651e6a65d5731e869dc136fb301b0a8c0e4
    public static final String KEY =  "0b32a651e6a65d5731e869dc136fb301b0a8c0e4";
    public static final String DEFAULT_POLICY = "default-src 'self';";
    public static final String SCRIPT_CSP ="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com;";
    public static final String FRAME_CSP = "frame-src 'self';";
    public static final String STYLE_POLICY = "style-src 'self' 'unsafe-inline';";
    public static final String IMAGE_POLICY = "img-src 'self';";
    public static final String FONT_POLICY = "font-src 'self';";


    private Constants() {}
}
