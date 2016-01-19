//
//  XPathQuery.h
//  Crave
//
//  Created by Sony Theakanath on 6/28/15.
//  Copyright (c) 2015 Kuriakose Sony Theakanath. All rights reserved.
//

#import <Foundation/Foundation.h>

NSArray *PerformHTMLXPathQuery(NSData *document, NSString *query);
NSArray *PerformHTMLXPathQueryWithEncoding(NSData *document, NSString *query,NSString *encoding);
NSArray *PerformXMLXPathQuery(NSData *document, NSString *query);
NSArray *PerformXMLXPathQueryWithEncoding(NSData *document, NSString *query,NSString *encoding);
