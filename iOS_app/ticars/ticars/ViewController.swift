//
//  ViewController.swift
//  ticars
//
//  Created by Norman Saade on 03.10.15.
//  Copyright © 2015 Hackzurich. All rights reserved.
//

import UIKit
import Parse
import FBSDKCoreKit
import ParseFacebookUtilsV4

class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var tableView: UITableView!
    
    let attributes = ["price", "sport", "design"]
//    var carImageView : UIImageView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
//        loginUser()
        
        let carImage = UIImage(named: "car_6.jpg")
        let carImageView = UIImageView(image: carImage)
        carImageView.frame = self.tableView.bounds
        carImageView.contentMode = UIViewContentMode.ScaleAspectFill
        
        tableView.backgroundView = carImageView
        
        dispatch_async(dispatch_get_main_queue(), {self.tableView.reloadData()})
        
        queryCarObject()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.attributes.count
    }
    
    func tableView(tableView: UITableView, willDisplayCell cell: UITableViewCell, forRowAtIndexPath indexPath: NSIndexPath) {
        cell.backgroundColor = UIColor.clearColor()
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {

        let cell = self.tableView.dequeueReusableCellWithIdentifier("userCell", forIndexPath: indexPath)
        cell.textLabel?.text = self.attributes[indexPath.row]
        cell.textLabel?.textColor = UIColor.whiteColor()
      
        if cell is MCSwipeTableViewCell{
            let tmp = cell as! MCSwipeTableViewCell
            
            let greenView = UIView()
            let redView = UIView()
            
            if (cell.textLabel?.text == "price") {
                tmp.setSwipeGestureWithView(greenView, color: UIColor.greenColor(), mode: MCSwipeTableViewCellMode.Switch, state: MCSwipeTableViewCellState.State1, completionBlock: { cell, state, mode in
                    // Query a new car with a lower price
                });
                tmp.setSwipeGestureWithView(redView, color: UIColor.redColor(), mode: MCSwipeTableViewCellMode.Switch, state: MCSwipeTableViewCellState.State3, completionBlock: { cell, state, mode in
                    // Query a new car with a lower price
                });
            } else if (cell.textLabel?.text == "sport") {
                tmp.setSwipeGestureWithView(greenView, color: UIColor.greenColor(), mode: MCSwipeTableViewCellMode.Switch, state: MCSwipeTableViewCellState.State1, completionBlock: { cell, state, mode in
                    // Query a new car with a lower sport value
                });
                tmp.setSwipeGestureWithView(redView, color: UIColor.redColor(), mode: MCSwipeTableViewCellMode.Switch, state: MCSwipeTableViewCellState.State3, completionBlock: { cell, state, mode in
                    // Query a new car with a lower sport value
                });
            } else if (cell.textLabel?.text == "design") {
                tmp.setSwipeGestureWithView(greenView, color: UIColor.greenColor(), mode: MCSwipeTableViewCellMode.Switch, state: MCSwipeTableViewCellState.State1, completionBlock: { cell, state, mode in
                    // Query a new car with a lower design
                });
                tmp.setSwipeGestureWithView(redView, color: UIColor.redColor(), mode: MCSwipeTableViewCellMode.Switch, state: MCSwipeTableViewCellState.State3, completionBlock: { cell, state, mode in
                    // Query a new car with a lower design
                });
            } else {
                
            }
        }
        return cell
    }
    
    func loginUser(){
        PFFacebookUtils.logInInBackgroundWithReadPermissions(["read_mailbox"]) {
            (user: PFUser?, error: NSError?) -> Void in
            if let user = user {
                if user.isNew {
                    print("User signed up and logged in through Facebook!")
                } else {
                    print("User logged in through Facebook!")
                }
            } else {
                print("Uh oh. The user cancelled the Facebook login.")
            }
        }
    }
    
    func queryCarObject() {
        PFCloud.callFunctionInBackground("recommendByScores", withParameters: ["scores": ["family": 3, "price": 3]]) {
            (response: AnyObject?, error: NSError?) -> Void in
            print("maybe sth happened, not sure what")
        }
    }

}

