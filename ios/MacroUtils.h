//  Lares
//  MacroUtils.h
//  Created by 周刚涛 on 14-10-26.
//  Copyright (c) 2014年 周刚涛. All rights reserved.
//

#ifdef DEBUG
#define debugLog(...) NSLog(__VA_ARGS__)
#define debugMethod() NSLog(@"%s", __func__)
#else
#define debugLog(...)
#define debugMethod()
#endif

//#ifdef DEBUG
//    #  define LOG(fmt, ...) do {                                            \
//        NSString* file = [[NSString alloc] initWithFormat:@"%s", __FILE__]; \
//        NSLog((@"%@(%d) " fmt), [file lastPathComponent], __LINE__, ##__VA_ARGS__); \
//        [file release];                                                 \
//    } while(0)
//
//    #  define LOG_METHOD NSLog(@"%s", __func__)
//    #  define LOG_CMETHOD NSLog(@"%@/%@", NSStringFromClass([self class]), NSStringFromSelector(_cmd))
//    #  define COUNT(p) NSLog(@"%s(%d): count = %d\n", __func__, __LINE__, [p retainCount]);
//    #  define LOG_TRACE(x) do {printf x; putchar('\n'); fflush(stdout);} while (0)
//#else
//    #  define LOG(...)
//    #  define LOG_METHOD
//    #  define LOG_CMETHOD
//    #  define COUNT(p)
//    #  define LOG_TRACE(x)
//#endif

#define EMPTY_STRING        @""
#define PATH_OF_APP_HOME    NSHomeDirectory()
#define PATH_OF_TEMP        NSTemporaryDirectory()
#define PATH_OF_DOCUMENT    [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0]

#define USER_CONFIG(__key) [[NSUserDefaults standardUserDefaults] objectForKey:__key]
#define USER_SET_CONFIG(__key, __value) [[NSUserDefaults standardUserDefaults] setObject:__value forKey:__key]

/* KVO */
#define KVO_WILLCHANGE(__key)   [self willChangeValueForKey:__key]
#define KVO_DIDCHANGE(__key)    [self didChangeValueForKey:__key]
#define KVO_CHANGE(__key)       [self willChangeValueForKey:__key];[self didChangeValueForKey:__key]


/* Device */
#define isIPhone5 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO)

#define isPad (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)

#define UISCREEN_WIDTH  [UIScreen mainScreen].bounds.size.width

#define UISCREEN_HEIGHT  [UIScreen mainScreen].bounds.size.height

#define IOS7 [[[UIDevice currentDevice] systemVersion]floatValue] < 8.0

/* Release */
#if __has_feature(objc_arc)
#define SARELEASE(__obj) \
do {\
__obj = nil;\
}while(0)

#define SARELEASE_TIMER(__timer) \
do {\
[__timer invalidate];\
__timer = nil;\
}while(0)
#else
#define SARELEASE(__obj) \
do {\
[__obj release];\
__obj = nil;\
}while(0)

#define SARELEASE_TIMER(__timer) \
do {\
[__timer invalidate];\
[__timer release];\
__timer = nil;\
}while(0)
#endif

/* IOS版本 */
#define SYSTEM_VERSION_EQUAL_TO(v)                  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedSame)
#define SYSTEM_VERSION_GREATER_THAN(v)              ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedDescending)
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN(v)                 ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN_OR_EQUAL_TO(v)     ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedDescending)

/* Color */
#define COLOR(R, G, B, A) [UIColor colorWithRed:R/255.0 green:G/255.0 blue:B/255.0 alpha:A]

/* Constants */
#define DEVICE_LIST_CELL_ROW_HEIGHT (50)

#define SHOW_NETWORK_INDICATOR() [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:YES]

#define HIDE_NETWORK_INDICATOR() [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:NO]
#define sysDege (AppDelegate *)[[UIApplication sharedApplication] delegate]

#define BPMTaskMenuCenterSaveListDataNotify  @"BPMTaskMenuCenterSaveListDataNotify"

#define IMG(__name) [UIImage imageNamed:__name]
#define STRING(__str) __str?[NSString stringWithUTF8String:__str]:nil
#define ARRAY(__obj1, ...) [NSArray arrayWithObjects:__obj1, ##__VA_ARGS__, nil]
#define VERSION() [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"]

#define  DEFAULT_VALID_TIME  300
#define  DEFAULT_CELL_HIGHT 80.0f

#define DEFAULT_TITLE_FONTSIZE    20.0f
#define DEFAULT_TITLE_FONT(s) [UIFont systemFontOfSize:s]//[UIFont fontWithName:@"STHeitiTC-Medium" size:s]

#define DEFAULT_FONTSIZE    16.0f
#define DEFAULT_FONT(s)         [UIFont fontWithName:@"STHeitiTC-Light" size:s]

#define  DEFAULT_GRAY_LAB_TXT  [UIColor colorWithRed:138/255.0f green:136/255.0f blue:137/255.0f alpha:1.0f]

#define  DEFAULT_GRAY_LAB_TXT  [UIColor colorWithRed:138/255.0f green:136/255.0f blue:137/255.0f alpha:1.0f]

#define  DEFAULT_BG_COLOR  [UIColor colorWithRed:231/255.0f green:231/255.0f blue:231/255.0f alpha:1.0f]

#define DEFAULT_CELL_LINE_COLOR [UIColor colorWithRed:7/255.0f green:4/255.0f blue:5/255.0f alpha:1.0]
#define DEFAULT_CELL_LINE1_COLOR [UIColor colorWithRed:43/255.0f green:44/255.0f blue:47/255.0f alpha:1.0]

#define DEFAULT_YELLOW_BTN [UIColor colorWithRed:250/255.0f green:160/255.0f blue:33/255.0f alpha:1.0]

#define UIColorFromRGB(rgbValue) [UIColor \
colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:((float)((rgbValue & 0xFF00) >> 8))/255.0 \
blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

//RGB color macro with alpha
#define UIColorFromRGBWithAlpha(rgbValue,a) [UIColor \
colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:((float)((rgbValue & 0xFF00) >> 8))/255.0 \
blue:((float)(rgbValue & 0xFF))/255.0 alpha:a]

 //‘PP’采购申请   ‘PO’ 采购订单  ‘PD’ 采购预付款  ‘BO’ 借款  ‘BX’ 报销 "HR" 人事 DG 对公付款 HT 合同
#define CATEGORY_BX @"BX"
#define CATEGORY_BO @"BO"
#define CATEGORY_PP @"PP"
#define CATEGORY_PO @"PO"
#define CATEGORY_PD @"PD"
#define CATEGORY_HR @"HR"
#define CATEGORY_HT @"HT"
#define CATEGORY_DG @"DG"
