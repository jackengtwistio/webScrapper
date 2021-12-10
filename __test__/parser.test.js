const parser = require('../parser')
const fs = require('fs')
let html

it('should give 4', () => {
    const result = parser.add(2,2)
    expect(result).toBe(4)
    
})

