// SPDX-License-Identifier: MIT License
pragma solidity >=0.8.9;
  /**
   * @title courses
   * @dev ContractDescription
   * @custom:dev-run-script file_path
   */

contract courses{
    struct courseinfo{
        address wallet;
        string[] url;
        uint256 price;
    }
    mapping (uint256 => courseinfo) public courseid; 

    function addcourse(uint256 cid, address wallet, uint256 price) external {
        courseid[cid].wallet = wallet;
        courseid[cid].price = price;
    }

    function deletecourse(uint256 cid) external {
       delete courseid[cid];
    }

    function addlesson(uint256 cid, string memory lessonurl) external {
        courseid[cid].url.push(lessonurl);
    }

    function changeprice(uint256 newprice, uint256 cid, address wallet) public returns (bool){
        if(courseid[cid].wallet == wallet)
        {            courseid[cid].price = newprice;
        return true;
        }
        else {return false;}
    }
}