class Basket {
    constructor(){
        this.basketRecord = [];
        this.totalCost = 0;
        this.totalQuantity = 0;
    }

    RecalculateTotal(table, quantity) {
        table.lastElementChild.firstElementChild.children[2].textContent = this.totalCost;
        table.lastElementChild.firstElementChild.children[3].textContent = this.totalQuantity;
    }

    AddProduct(link) {
        link = +link;
        let name = productList[link].head;
        let price = productList[link].price;
        let count = 1;
        this.totalCost += price;
        this.totalQuantity++;
        document.getElementById("basketInformation").textContent = "В корзине: " + this.totalQuantity + " товаров";
        for (let i = 0; i < this.basketRecord.length; i++) {
            if (this.basketRecord[i].name == name && this.basketRecord[i].price == price)
            {
                this.basketRecord[i].count++;
                let table = document.querySelector(".myTable");
                table.children[2].children[i].children[3].textContent = this.basketRecord[i].count;
                this.RecalculateTotal(table);
                return;
            }
       }
       this.basketRecord.push({name, price, count});
      
       let basketDiv = document.getElementById("basketTable");
       if (basketDiv.children.length == 1)
       {
            let newTable = document.createElement("table");
            newTable.setAttribute("class", "myTable");
            newTable.innerHTML = "<caption>Содержимое корзины</caption><thead><tr><th width='5%'>&nbsp;</th><th width='42%'>Товар</th><th width='18%'>Стоимость</th><th width='18%'>Количество</th><th width='17%'>&nbsp;</th></tr></thead>";

            let newTbody = document.createElement("tbody");
            newTbody.innerHTML = "<tr><td>1.</td><td>" + name + "</td><td>" + price + "</td><td>1</td><td><button class='mybtn2' onclick=basket.PlusOne(0)>+</button><button class='mybtn2' onclick=basket.MinusOne(0)>-</button></td></tr>";
            newTable.appendChild(newTbody);

            let newTfoot = document.createElement("tfoot");
            newTfoot.innerHTML = "<tr><td></td><td>Всего:</td><td>" + this.totalCost + "</td><td>1</td><td></td></tr>";
            newTable.appendChild(newTfoot);

            basketDiv.replaceChild(newTable, basketDiv.children[0]);

            let newP = document.createElement("p");
            newP.innerHTML = "<button class='mybtn2'>Купить</button><button class='mybtn2' onclick=basket.Clear()>Очистить корзину</button>";
            basketDiv.appendChild(newP);
       }
       else
       {
            let table = document.querySelector(".myTable");

            let newTr = document.createElement("tr");
            newTr.innerHTML = "<td>" + (table.children[2].children.length + 1) + ".</td><td>" + name + "</td><td>" + price + "</td><td>1</td><td><button class='mybtn2' onclick=basket.PlusOne(" + (this.basketRecord.length - 1) + ")>+</button><button class='mybtn2' onclick=basket.MinusOne(" + (this.basketRecord.length - 1) + ")>-</button></td>";

            table.children[2].appendChild(newTr);//insertBefore(newTr, table.lastElementChild);
            this.RecalculateTotal(table);
       }
    }

    PlusOne(i) {
        this.basketRecord[i].count++;
        this.totalCost += this.basketRecord[i].price;
        this.totalQuantity++;

        let table = document.querySelector(".myTable");
        table.children[2].children[i].children[3].textContent = this.basketRecord[i].count;
        document.getElementById("basketInformation").textContent = "В корзине: " + this.totalQuantity + " товаров";
        this.RecalculateTotal(table);
    }

    MinusOne(i) {
        this.basketRecord[i].count--;
        this.totalCost -= this.basketRecord[i].price;
        this.totalQuantity--;
        document.getElementById("basketInformation").textContent = "В корзине: " + this.totalQuantity + " товаров";
        if (this.basketRecord.length == 1 && this.basketRecord[i].count == 0) this.Clear();
        else {
            let table = document.querySelector(".myTable");
            
            if (this.basketRecord[i].count > 0) table.children[2].children[i].children[3].textContent = this.basketRecord[i].count;
            else {
                this.basketRecord.splice(i, 1); 
                table.children[2].removeChild(table.children[2].children[i]);
                for (let j = i; j < table.children[2].children.length; j++) {
                    table.children[2].children[j].children[0].textContent = (j + 1) + ".";
                    table.children[2].children[j].children[4].firstElementChild.setAttribute("onclick", "basket.PlusOne(" + j + ")");
                    table.children[2].children[j].children[4].lastElementChild.setAttribute("onclick", "basket.MinusOne(" + j + ")");
                }
            }

            this.RecalculateTotal(table);
        }
    }
   
    Clear() {
        this.basketRecord = [];
        this.totalCost = 0;
        this.totalQuantity = 0;
        document.getElementById("basketInformation").textContent = "В корзине: 0 товаров";

        let basketDiv = document.getElementById("basketTable");
        while (basketDiv.firstChild) {
            basketDiv.removeChild(basketDiv.firstChild);
        }
        let basketHeading = document.createElement("h1");
        basketHeading.textContent = "Корзина пуста.";
        basketDiv.appendChild(basketHeading);
    }
}
