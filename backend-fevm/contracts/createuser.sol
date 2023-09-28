// SPDX-License-Identifier: MIT License
pragma solidity >=0.8.9;
  /**
   * @title createuser
   * @dev ContractDescription
   * @custom:dev-run-script file_path
   */

contract createuser{
    struct userinfo{
        string firstname;
        string lastname;
        string email;
        uint256 usertype;
        uint256[] courses;
        uint256 noofcourses;
    }
    mapping (address => userinfo) public wallets; 

    function saveuser(address wallet, string memory firstname, string memory lastname, string memory email, uint256 usertype) external {
        wallets[wallet].firstname = firstname;
        wallets[wallet].lastname = lastname;
        wallets[wallet].email = email;
        wallets[wallet].usertype = usertype;
        wallets[wallet].noofcourses = 0;
    }

    function removeuser(address wallet) external {
       delete wallets[wallet];
    }

    function coursepurchase(address wallet, uint256 courseid) external{
        wallets[wallet].courses[wallets[wallet].noofcourses] = courseid;
        wallets[wallet].noofcourses++;
    }

    function getcourses (address wallet) external view returns (uint256[] memory)
    {
        return wallets[wallet].courses;
    }
}