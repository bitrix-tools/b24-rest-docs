{% note warning "Только для кода на домене Битрикс24" %}

Объект `Messenger` доступен только коду страницы и расширениям — тому коду, который выполняется на самой странице Битрикс24, на том же домене. Получить объект можно через `import { Messenger } from 'im.public'` или `BX.Runtime.loadExtension('im.public.iframe')`: оба способа дают прямой доступ к среде выполнения мессенджера.

Приложение запускается в своем фрейме, на другом домене, и доступа к этой среде выполнения не имеет: ни `Messenger.*`, ни `BX.Runtime.loadExtension` из него не вызываются. Чтобы открыть чат из приложения, используйте [BX24.im.openMessenger](/sdk/bx24-js-sdk/additional-functions/bx24-im-open-messenger.html) или `$b24.parent.imOpenMessenger` из библиотеки [b24jssdk](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/frame-parent).

{% endnote %}
