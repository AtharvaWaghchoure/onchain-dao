// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract NFTMarketplace {
    /// token no. pointing to the address of the owner
    mapping(uint256 => address) public tokens;

    ///
    uint256 nftPrice = 0.01 ether;

    /// purchase() functions accepts ETH from the owner who called it and
    /// marks the owner of tokenID as the caller of the address
    /// _tokenId - is the NFT token Id to purchase
    function purchase(uint256 _tokenId) external payable {
        require(msg.value == nftPrice, "This NFT costs 0.01 ether");
        tokens[_tokenId] = msg.sender;
    }

    // getPrice() returns the price of a single NFT
    function getPrice() external view returns (uint256) {
        return nftPrice;
    }

    /// This available() functions checks if the nft is available at the tokenId
    /// by checking if the address at that tokenId is 0x0 or zero
    function available(uint256 _tokenId) external view returns (bool) {
        if (tokens[_tokenId] == address(0)) {
            return true;
        }
        return false;
    }
}
