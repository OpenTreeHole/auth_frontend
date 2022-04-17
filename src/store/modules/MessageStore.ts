import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Message from '@/components/MessageSnackbar.vue'
import store from '@/store'

@Module({ store: store, dynamic: true, name: 'MessageStore', namespaced: true })
class MessageStore extends VuexModule {
  /**
   * The message instance in the current page.
   */
  message: Message | null = null

  /**
   * Set the message instance in the current page.
   * <p> Should be called when a new page is created, in order to make the message showed in the correct place. </p>
   * @param messageInstance - the message instance in the current page.
   */
  @Mutation
  setMessageComponent(messageInstance: Message) {
    this.message = messageInstance
  }

  /**
   * Display an error message in the Message component.
   * @param str - the message.
   */
  @Action({ rawError: true })
  messageError(str: string) {
    console.log('error')
    if (this.message) this.message.error(str)
  }

  /**
   * Display a success message in the Message component.
   * @param str - the message.
   */
  @Action({ rawError: true })
  messageSuccess(str: string) {
    if (this.message) {
      this.message.success(str)
    }
  }

  /**
   * Display a warning message in the Message component.
   * @param str - the message.
   */
  @Action({ rawError: true })
  messageWarning(str: string) {
    if (this.message) this.message.warning(str)
  }

  /**
   * Display an info message in the Message component.
   * @param str - the message.
   */
  @Action({ rawError: true })
  messageInfo(str: string) {
    if (this.message) this.message.info(str)
  }
}

const module = getModule(MessageStore)
export default module
