toggleCard = (selectedCard) => { // Argument passed is the card that was clicked
    let cards = document.querySelectorAll('.accordion-item') // Grab all cards in the DOM
    cards.forEach(function(card) {      // Iterate over all cards
        if (card === selectedCard) {    // Check every card if it is the one that was selected
            if (card.children[1].style.maxHeight === '20rem') { // If the selected card is closed, open it,  and vice versa
                card.children[1].style.maxHeight = '0';
                card.children[0].children[0].style.display = 'block'
                card.children[0].children[1].style.display = 'none'
            } else {
                card.children[1].style.maxHeight = '20rem';
                card.children[0].children[0].style.display = 'none'
                card.children[0].children[1].style.display = 'block'
            }
        } else { // Close all other cards
            card.children[1].style.maxHeight = '0';
            card.children[0].children[0].style.display = 'block'
            card.children[0].children[1].style.display = 'none'
        }
    })
}