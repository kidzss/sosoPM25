//
//  UserDefaultManage.m
//  PropertyFinder
//
//  Created by 周刚涛 on 16/1/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "UserDefaultManage.h"
#import "AppDelegate.h"

@interface UserDefaultManage()


@end

@implementation UserDefaultManage

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addCityName:(NSString *)name location:(NSString *)location) {
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  USER_SET_CONFIG(@"city",name);
  USER_SET_CONFIG(@"location",location);

  dispatch_async(dispatch_get_main_queue(), ^{
    [sysDege scheduledGetPm25Html:location];
  });
}

//- (void)findEvents:(RCTResponseSenderBlock)callback
//{
//  RCT_EXPORT();
//  NSArray *events = ...
//  callback(@[[NSNull null], events]);
//}

@end
