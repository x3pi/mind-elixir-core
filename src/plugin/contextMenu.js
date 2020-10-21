import i18n from '../i18n'

export default function (mind, option) {
  let createLi = (id, name, keyname) => {
    let li = document.createElement('li')
    li.id = id
    li.innerHTML = `<span>${name}</span><span>${keyname}</span>`
    return li
  }
  let locale = i18n[mind.locale] ? mind.locale : 'en'

  let en = createLi('cm-show', mind.nodeData.show, '')



  let menuUl = document.createElement('ul')

  menuUl.className = 'menu-list'
  menuUl.appendChild(en)

  if (!option || option.editor) {
    let edit_show = createLi('cm-edit-show', '<textarea id="area1" rows="5" cols="50" >' + mind.nodeData.show + '</textarea>', '')

    let save_show = createLi('cm-save-show', 'Save show', '')
    let hidden_menu = createLi('cm-hidden-menu', 'Exit show', '')


    let add_child = createLi('cm-add_child', i18n[locale].addChild, 'tab')
    let add_sibling = createLi('cm-add_sibling', i18n[locale].addSibling, 'enter')
    let remove_child = createLi(
      'cm-remove_child',
      i18n[locale].removeNode,
      'delete'
    )
    let focus = createLi('cm-fucus', i18n[locale].focus, '')
    let unfocus = createLi('cm-unfucus', i18n[locale].cancelFocus, '')
    let up = createLi('cm-up', i18n[locale].moveUp, 'PgUp')
    let down = createLi('cm-down', i18n[locale].moveDown, 'Pgdn')
    let link = createLi('cm-down', i18n[locale].link, '')
    menuUl.appendChild(edit_show)
    menuUl.appendChild(save_show)
    menuUl.appendChild(hidden_menu)



    menuUl.appendChild(add_child)
    menuUl.appendChild(add_sibling)
    menuUl.appendChild(remove_child)

    if (!option || option.focus) {
      menuUl.appendChild(focus)
      menuUl.appendChild(unfocus)
    }
    menuUl.appendChild(up)
    menuUl.appendChild(down)
    if (!option || option.link) {
      menuUl.appendChild(link)
    }
    save_show.onclick = e => {
      mind.saveShow();
      menuContainer.hidden = true
  
    }
    hidden_menu.onclick = e => {
      menuContainer.hidden = true
    }

    add_child.onclick = e => {
      mind.addChild()
    }
    add_sibling.onclick = e => {
      mind.insertSibling()
    }
    remove_child.onclick = e => {
      mind.removeNode()
    }
    focus.onclick = e => {
      console.log('---------------')
      console.log(mind.nodeData.show)
      mind.focusNode(mind.currentNode)

    }
    unfocus.onclick = e => {
      console.log('----------11-----')
      console.log(mind.nodeData)
      mind.cancelFocus()
    }
    up.onclick = e => {
      mind.moveUpNode()
    }
    down.onclick = e => {
      mind.moveDownNode()
    }
    link.onclick = e => {
      let from = mind.currentNode
      mind.map.addEventListener(
        'click',
        e => {
          e.preventDefault()
          if (
            e.target.parentElement.nodeName === 'T' ||
            e.target.parentElement.nodeName === 'ROOT'
          ) {
            mind.createLink(from, mind.currentNode)
          } else {
            console.log('取消连接')
          }
        },
        {
          once: true,
        }
      )
    }
  }


  if (option && option.extend) {
    for (let i = 0; i < option.extend.length; i++) {
      let item = option.extend[i]
      let dom = createLi(item.name, item.name, item.key || '')
      menuUl.appendChild(dom)
      dom.onclick = e => {
        item.onclick(e)
      }
    }
  }
  let menuContainer = document.createElement('cmenu')
  menuContainer.appendChild(menuUl)
  menuContainer.hidden = true
  console.log('-----------right -----------')

  mind.container.append(menuContainer)

  mind.container.oncontextmenu = function (e) {
    e.preventDefault()
    // console.log(e.pageY, e.screenY, e.clientY)
    let target = e.target
    if (target.tagName === 'TPC') {
      mind.selectNode(target)
      menuContainer.hidden = false
      let height = menuUl.offsetHeight
      let width = menuUl.offsetWidth
      if (height + e.clientY > window.innerHeight) {
        menuUl.style.top = ''
        menuUl.style.bottom = '0px'
      } else {
        menuUl.style.bottom = ''
        menuUl.style.top = e.clientY + 15 + 'px'
      }
      if (width + e.clientX > window.innerWidth) {
        menuUl.style.left = ''
        menuUl.style.right = '0px'
      } else {
        menuUl.style.right = ''
        menuUl.style.left = e.clientX + 10 + 'px'
      }
    }
  }
  if (!option.editor) {
    mind.container.onclick = e => {
      menuContainer.hidden = true
    }
  }
}

