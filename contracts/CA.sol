//SPDX-License-Identifier:MIT
pragma solidity 0.8.17;

contract Certi{

    address admin;

    constructor(){
        admin=msg.sender;
    }
    
    struct certificate {
        string candidateName;
        string courseName;
        string grade;
        string date;
    }

    mapping(string=>certificate) public certificateDetails;

    function newCertificate(
    string memory _certificateID,
    string memory _candidateName,
    string memory _courseName,
    string memory _grade,
    string memory _date)public {

        require(msg.sender == admin,"Access Denied");

        certificateDetails[_certificateID] = certificate(   //calling userdefined datatype as a function()
            _candidateName,
            _courseName,
            _grade,
            _date
        );
    }
}