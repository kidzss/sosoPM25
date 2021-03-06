/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "RCTRootView.h"
#import "TFHpple.h"
#import "JX_GCDTimerManager.h"
#import "MacroUtils.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  /**
   * Loading JavaScript code - uncomment the one you want.
   *
   * OPTION 1
   * Load from development server. Start the server from the repository root:
   *
   * $ npm start
   *
   * To run on device, change `localhost` to the IP address of your computer
   * (you can get this by typing `ifconfig` into the terminal and selecting the
   * `inet` value under `en0:`) and make sure your computer and iOS device are
   * on the same Wi-Fi network.
   */
//10.0.0.3  10.1.7.21 172.20.2.223
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  /**
   * OPTION 2
   * Load from pre-bundled file on disk. The static bundle is automatically
   * generated by "Bundle React Native code and images" build step.
   */

  // 处理iOS8本地推送不能收到的问题
#ifdef __IPHONE_8_0
  //ios8注册推送
  UIUserNotificationType type = UIUserNotificationTypeBadge | UIUserNotificationTypeAlert | UIUserNotificationTypeSound;
  UIUserNotificationSettings *setting = [UIUserNotificationSettings settingsForTypes:type categories:nil];
  [[UIApplication sharedApplication] registerUserNotificationSettings:setting];
#else
  //register to receive notifications
  UIRemoteNotificationType myTypes = UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound;
  [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myTypes];
#endif
  
  NSString *location = USER_CONFIG(@"location");
  if (location&&location.length) {
    [self scheduledGetPm25Html:location];
  }
  
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"sosoPM2.5"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

#ifdef __IPHONE_8_0
//ios8需要调用内容
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  //register to receive notifications
  [application registerForRemoteNotifications];
}

- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void(^)())completionHandler
{
  //handle the actions
  if ([identifier isEqualToString:@"declineAction"]){
    
  }
  else if ([identifier isEqualToString:@"answerAction"]){
    
  }
}

#endif

// 接收本地推送（AppDelegate.m中添加）
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification{
  UIAlertView *alert = [[UIAlertView alloc] initWithTitle:notification.alertTitle message:notification.alertBody delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil];
  [alert show];
  
  // 图标上的数字减1
  application.applicationIconBadgeNumber -= 1;
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
  // 直接打开app时，图标上的数字清零
  application.applicationIconBadgeNumber = 0;
}

- (void)getPm25Html:(NSString*)url {
  NSURL *lurl = [NSURL URLWithString:url];
  NSURLRequest *request = [[NSURLRequest alloc]initWithURL:lurl cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:2000];
  NSURLConnection *connection = [[NSURLConnection alloc] initWithRequest:request delegate:self];
  [connection start];
  NSLog(@"coo %@",connection);
}

- (void)scheduledGetPm25Html:(NSString*)url {
  NSTimeInterval time = [self getMyRepTimeInterval];
  dispatch_queue_t mainQ = dispatch_get_main_queue();
  [[JX_GCDTimerManager sharedInstance] scheduledDispatchTimerWithName:@"scGenHtml" timeInterval:time queue:mainQ repeats:YES actionOption:AbandonPreviousAction action:^{
    [self getPm25Html:url];
  }];
}

//接收到服务器回应的时候调用此方法
- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response {
  NSHTTPURLResponse *res = (NSHTTPURLResponse *)response;
  NSLog(@"%@",[res allHeaderFields]);
  self.receiveData = [NSMutableData data];
}

//接收到服务器传输数据的时候调用，此方法根据数据大小执行若干次
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data {
  [self.receiveData appendData:data];
}

- (void)parseDataPm25Html:(NSMutableData*)htmlData {
  
  TFHpple *doc = [TFHpple hppleWithHTMLData:htmlData encoding:@"UTF8"];
//  TFHppleElement *city = [doc peekAtSearchWithXPathQuery:@"//div[@class='city_name']/h2"];
//  TFHppleElement *level = [doc peekAtSearchWithXPathQuery:@"//div[@class='level']/h4"];
//  TFHppleElement *uptime = [doc peekAtSearchWithXPathQuery:@"//div[@class='live_data_time']/p"];
//  TFHppleElement *unit = [doc peekAtSearchWithXPathQuery:@"//div[@class='live_data_unit']"];
  NSArray *caption = [doc searchWithXPathQuery:@"//div[@class='container']/div[@class='c_item']/h3"];
  NSArray *value = [doc searchWithXPathQuery:@"//div[@class='container']/div[@class='c_item']/p"];
  NSMutableArray *captionStr = [NSMutableArray array];
  NSMutableArray *val = [NSMutableArray array];
  
  for (id item in caption) {
    TFHppleElement* firstChild =[(TFHppleElement *)item firstChild];
    [captionStr addObject:[(NSString*)firstChild.content stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]]];
  }
  
  for (id itemv in value) {
    TFHppleElement* firstChild =[(TFHppleElement *)itemv firstChild];
    [val addObject:[(NSString*)firstChild.content stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]]];
  }
  
  NSString *pm25 = [NSString stringWithFormat:@"%@\n%@",captionStr[0],val[0]];
  NSString *tips = [NSString stringWithFormat:@"%@\n%@",captionStr[1],val[1]];
  
  USER_SET_CONFIG(@"pm25",pm25);
  USER_SET_CONFIG(@"tips",tips);
  
  [self addPm25ScheduleLocalNotification:pm25];
  [self addTipsScheduleLocalNotification:tips];
}

- (NSTimeInterval)getMyRepTimeInterval {
  NSTimeInterval myInterval;
  
  //现在的时间
  NSDate *now = [NSDate date];
  
  //获得系统日期
  NSCalendar *cal = [NSCalendar currentCalendar];
  NSUInteger unitFlags = NSCalendarUnitDay | NSCalendarUnitMonth | NSCalendarUnitYear;
  NSDateComponents *conponent = [cal components:unitFlags fromDate:now];
  NSInteger year = [conponent year];
  NSInteger month = [conponent month];
  NSInteger day = [conponent day];

    //获得当天的7  时间
  NSString *nsStringDate = [NSString stringWithFormat:@"%ld-%ld-%ld-%d-%d-%d",
                     (long)year,(long)month,(long)day,7,0,0];
  //根据时间字符串获得NSDate
  NSDateFormatter *dateformatter = [[NSDateFormatter alloc] init];
  [dateformatter setDateFormat:@"YYYY-MM-dd-HH-mm-ss"];
  NSDate *today = [dateformatter dateFromString:nsStringDate];
  
  //然后比较  now跟  todayTwelve那个大，如果已经过了7点，那就设置明天7点
  //NSComparisonResult dateResult = [now compare:today];
  NSTimeInterval ss = [today timeIntervalSinceDate:now];
  myInterval = [[today dateByAddingTimeInterval: (24 * 60 * 60 + ss)] timeIntervalSinceNow];

  return myInterval;
}

- (NSDate*)getMyFireDate:(BOOL)pm {
  NSDate *myDate;
  
  //现在的时间
  NSDate *now = [NSDate date];
  
  //获得系统日期
  NSCalendar *cal = [NSCalendar currentCalendar];
  NSUInteger unitFlags = NSCalendarUnitDay | NSCalendarUnitMonth | NSCalendarUnitYear;
  NSDateComponents *conponent = [cal components:unitFlags fromDate:now];
  NSInteger year = [conponent year];
  NSInteger month = [conponent month];
  NSInteger day = [conponent day];
  
  NSString *nsStringDate12;
  
  if (pm) {
    //获得当天的7:30  时间
    nsStringDate12 = [NSString stringWithFormat:@"%ld-%ld-%ld-%d-%d-%d",
                      (long)year,(long)month,(long)day,7,30,0];
  } else {
    //获得当天的7:30  时间
    nsStringDate12 = [NSString stringWithFormat:@"%ld-%ld-%ld-%d-%d-%d",
                      (long)year,(long)month,(long)day,7,35,0];
  }

  //根据时间字符串获得NSDate
  NSDateFormatter *dateformatter = [[NSDateFormatter alloc] init];
  [dateformatter setDateFormat:@"YYYY-MM-dd-HH-mm-ss"];
  NSDate *todayTwelve = [dateformatter dateFromString:nsStringDate12];
  
  //然后比较  now跟  todayTwelve那个大，如果已经过了12点，那就设置明天12点
  NSComparisonResult dateResult = [now compare:todayTwelve];
  if (dateResult == NSOrderedDescending) {
    NSDate  *  tomorrowTwelve = [todayTwelve dateByAddingTimeInterval: 24 * 60 * 60];
    myDate =  tomorrowTwelve;
  } else {
    myDate = todayTwelve;
  }

  return myDate;
}

- (void)addPm25ScheduleLocalNotification:(NSString*)pushStr {
  [[UIApplication sharedApplication] cancelAllLocalNotifications];
  //清空 icon数量
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
  //启动本地通知
  UILocalNotification *notification = [[UILocalNotification alloc] init];
  if (notification != nil) {
    notification.fireDate = [self getMyFireDate:YES];
    notification.repeatInterval = kCFCalendarUnitDay;
    notification.timeZone = [NSTimeZone defaultTimeZone];
    notification.applicationIconBadgeNumber = 1;
    NSArray *strArr = [pushStr componentsSeparatedByString:@"\n"];
    if ([strArr count]) {
      notification.alertTitle = strArr[0];
      notification.alertBody = strArr[1];
    } else {
      notification.alertBody = pushStr;
    }

    notification.alertAction = @"打开";
    [[UIApplication sharedApplication] scheduleLocalNotification:notification];
  }
}

- (void)addTipsScheduleLocalNotification:(NSString*)pushStr {
  [[UIApplication sharedApplication] cancelAllLocalNotifications];
  //清空 icon数量
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
  //启动本地通知
  UILocalNotification *notification = [[UILocalNotification alloc] init];
  if (notification != nil) {
    notification.fireDate = [self getMyFireDate:NO];
    notification.repeatInterval = kCFCalendarUnitDay;
    notification.timeZone = [NSTimeZone defaultTimeZone];
    notification.applicationIconBadgeNumber = 1;
    NSArray *strArr = [pushStr componentsSeparatedByString:@"\n"];
    if ([strArr count]) {
      notification.alertTitle = strArr[0];
      notification.alertBody = strArr[1];
    } else {
      notification.alertBody = pushStr;
    }
    
    notification.alertAction = @"打开";
    [[UIApplication sharedApplication] scheduleLocalNotification:notification];
  }
}

//数据传完之后调用此方法
- (void)connectionDidFinishLoading:(NSURLConnection *)connection {
  //NSString *receiveStr = [[NSString alloc]initWithData:self.receiveData encoding:NSUTF8StringEncoding];
  //NSLog(@"%@",receiveStr);
  
  [self parseDataPm25Html:self.receiveData];
}

//网络请求过程中，出现任何错误（断网，连接超时等）会进入此方法
- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error {
  NSLog(@"%@",[error localizedDescription]);
}

@end
