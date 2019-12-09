import { Children } from "react"

export default function NewZoneTemlpate() {
  var a = (Math.random()*3|0)
  var b = (Math.random()*2|0)+1
  var arr = []
  var e
      a = (Math.random()*3|0)
      b = (Math.random()*2|0)+1
      console.log(a,(a+b)%3, Math.abs(a+(a+b)%3-3))
      arr[0] = a
      arr[1] = (a+b)%3
      arr[2] = Math.abs(a+(a+b)%3-3)

    function ranColorRGB() {
      var args = []
      for (e in arr) {
        if (arr[e] == 0) {
          args[e] = 0
        }
        if (arr[e] == 1)
          args[e] = 173
        if (arr[e] == 2)
          args[e] = (Math.random()*173|0)
      }
      return `rgb(${args[0]}, ${args[1]}, ${args[2]})`
    }

    function ranColorHex() {
      var str = '#'
      var cur
      var res
      for (e in arr) {
        console.log(arr[e])
        cur = str.concat('','')
        if (arr[e] == 0) {
          res = str.concat('','ad')
        }
        if (arr[e] == 1)
          res = str.concat('','00')
        if (arr[e] == 2)
          res =str.concat('','xx')
        str = res
      }
      str = str.replace(/x/g, y=>(Math.random()*16|0).toString(16))
      console.log(str)
      return str
    }
    

  return (
    {
      _id: "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)),
      parent_zone_id: null,
      master_zone_id: null,
      name: "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)),
      coords: [],
      color: ranColorRGB(),
      children: []
    }
  ) 
}


