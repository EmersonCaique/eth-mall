pragma solidity >=0.4.21 <0.6.0;

contract Mall {


    constructor() public {
        sellProduct("Ball", "Voley");
        sellProduct("Ball 1", "Voley");
    }

    struct Product {
        uint id;
        address payable seller;
        address buyer;
        string name;
        string description;
    }

    uint productCounter = 0;
    mapping (uint => Product) public products;        

    function sellProduct(string memory _name, string memory _description) public{
        
        Product memory newProduct = Product({
            id: productCounter,
            seller: msg.sender,
            buyer: address(0x0),
            name: _name,
            description: _description
        });
                
        products[productCounter] = newProduct;
        productCounter++;        
    }

    function getNumberOfProducts() public view returns (uint) {
        return productCounter;
    }
   
}