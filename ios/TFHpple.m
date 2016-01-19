//
//  TFHpple.m
//  Crave
//
//  Created by Sony Theakanath on 6/28/15.
//  Copyright (c) 2015 Kuriakose Sony Theakanath. All rights reserved.
//

#import "TFHpple.h"
#import "XPathQuery.h"

@interface TFHpple ()
{
    NSData * data;
    NSString * encoding;
    BOOL isXML;
}

@end


@implementation TFHpple

@synthesize data;
@synthesize encoding;


- (id) initWithData:(NSData *)theData encoding:(NSString *)theEncoding isXML:(BOOL)isDataXML
{
  if (!(self = [super init])) {
    return nil;
  }

  data = theData;
  encoding = theEncoding;
  isXML = isDataXML;

  return self;
}

- (id) initWithData:(NSData *)theData isXML:(BOOL)isDataXML
{
    return [self initWithData:theData encoding:nil isXML:isDataXML];
}

- (id) initWithXMLData:(NSData *)theData encoding:(NSString *)theEncoding
{
  return [self initWithData:theData encoding:theEncoding isXML:YES];
}

- (id) initWithXMLData:(NSData *)theData
{
  return [self initWithData:theData encoding:nil isXML:YES];
}

- (id) initWithHTMLData:(NSData *)theData encoding:(NSString *)theEncoding
{
    return [self initWithData:theData encoding:theEncoding isXML:NO];
}

- (id) initWithHTMLData:(NSData *)theData
{
  return [self initWithData:theData encoding:nil isXML:NO];
}

+ (TFHpple *) hppleWithData:(NSData *)theData encoding:(NSString *)theEncoding isXML:(BOOL)isDataXML {
  return [[[self class] alloc] initWithData:theData encoding:theEncoding isXML:isDataXML];
}

+ (TFHpple *) hppleWithData:(NSData *)theData isXML:(BOOL)isDataXML {
  return [[self class] hppleWithData:theData encoding:nil isXML:isDataXML];
}

+ (TFHpple *) hppleWithHTMLData:(NSData *)theData encoding:(NSString *)theEncoding {
  return [[self class] hppleWithData:theData encoding:theEncoding isXML:NO];
}

+ (TFHpple *) hppleWithHTMLData:(NSData *)theData {
  return [[self class] hppleWithData:theData encoding:nil isXML:NO];
}

+ (TFHpple *) hppleWithXMLData:(NSData *)theData encoding:(NSString *)theEncoding {
  return [[self class] hppleWithData:theData encoding:theEncoding isXML:YES];
}

+ (TFHpple *) hppleWithXMLData:(NSData *)theData {
  return [[self class] hppleWithData:theData encoding:nil isXML:YES];
}

#pragma mark -

// Returns all elements at xPath.
- (NSArray *) searchWithXPathQuery:(NSString *)xPathOrCSS
{
  NSArray * detailNodes = nil;
  if (isXML) {
    detailNodes = PerformXMLXPathQueryWithEncoding(data, xPathOrCSS, encoding);
  } else {
    detailNodes = PerformHTMLXPathQueryWithEncoding(data, xPathOrCSS, encoding);
  }

  NSMutableArray * hppleElements = [NSMutableArray array];
  for (id node in detailNodes) {
    [hppleElements addObject:[TFHppleElement hppleElementWithNode:node isXML:isXML withEncoding:encoding]];
  }
  return hppleElements;
}

// Returns first element at xPath
- (TFHppleElement *) peekAtSearchWithXPathQuery:(NSString *)xPathOrCSS
{
  NSArray * elements = [self searchWithXPathQuery:xPathOrCSS];
  if ([elements count] >= 1) {
    return [elements objectAtIndex:0];
  }

  return nil;
}

@end
