import { WeElement, h, tag } from 'omi'
import { tw, sheet } from 'omi-twind'
import { setTheme } from '@omiu/common'
import logo from '../../assets/logo.svg'
import '@omiu/avatar'
import '@omiu/icon/palette'
import '@omiu/hamburger-menu'
import '@omiu/select'

interface Props { }

const tagName = 'layout-header'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [tagName]: Omi.Props & Props
    }
  }
}

@tag(tagName)
export default class extends WeElement<Props> {
  static css = sheet.target

  store

  items = [{ label: '中文', value: 'zh' }, { label: 'English', value: 'en' }]

  isShowColorPicker: boolean = false

  install() {
    import('@omiu/color-picker')

    window.addEventListener('click', () => {
      this.isShowColorPicker = false
      //这个导致 o-hamburger-menu 的 active 二次执行传入 undefined,所以 onMenuChange里要记得改写 isLeftPanelClosed
      this.update()
    })
  }

  toggle = (evt) => {
    this.isShowColorPicker = !this.isShowColorPicker
    this.update()
    evt.stopPropagation()
  }

  onColorChange = (evt) => {
    this.store.themeColor = evt.detail.color
    setTheme('primary', evt.detail.color)
  }


  onMenuChange = (evt) => {
    this.store.isLeftPanelClosed = evt.detail
    if (this.store.isLeftPanelClosed) {
      this.store.openLeftPanel()
    } else {
      this.store.closeLeftPanel()
    }
  }

  onItemSelect = (evt) => {
    this.store.setLocals(evt.detail.value)
  }

  render() {
    return (
      <div class={tw`bg-gray-100 h-12 text-left border-b-1`}>
        <div class={tw`flex justify-between`}>
          <div class={tw`flex flex-row p-1 order-1`}>
            <o-hamburger-menu class={tw`mt-1.5 ml-1 `} color="rgb(107, 114, 128)" active={!this.store.isLeftPanelClosed} onchange={this.onMenuChange} ></o-hamburger-menu>
            <img class={tw`w-8 m-1 ml-3`} src={logo} alt="logo" />
            <div>
              <h1 class={tw`ml-3 leading-10 text-gray-500`}>OMI ADMIN</h1>

            </div>
            <div class={tw`inline-block mt-1.5 ml-3`}>
              <o-select css={`
            .o-select .o-input__inner {
              width: 117px;
            `} size="mini"
                onitem-select={this.onItemSelect}
                value={this.store.locale} items={this.items}>

              </o-select>
            </div>
          </div>

          <div class={tw`flex flex-row order-3 p-1 mr-3`}>
            <div class={tw`relative mt-2 mr-5`}>
              <div
                class={tw`cursor-pointer`}
                onClick={this.toggle}
                style={{ color: this.store.themeColor }}
              >
                <o-icon-palette></o-icon-palette>{this.store.localeMap.base.Theme}
              </div>
              {this.isShowColorPicker && (
                <o-color-picker
                  onchange={this.onColorChange}
                  onClick={(evt) => evt.stopPropagation()}
                  class={tw`absolute right-0 z-50`}
                  save={false}
                  preview={false}
                  button={false}
                  clear={false}
                  width="300px"
                ></o-color-picker>
              )}
            </div>

            <o-avatar src="https://wx.gtimg.com/resource/feuploader/202106/e685db3a4545b05f6fa05b4cbd0b25f0_420x420.png"></o-avatar>
          </div>
        </div>
      </div>
    )
  }
}
