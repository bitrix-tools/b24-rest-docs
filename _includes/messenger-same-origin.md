{% note alert "Только для кода на домене Битрикс24" %}

Объект `Messenger` доступен только коду, который выполняется на самой странице Битрикс24, на том же origin, — коду страницы и расширениям. Получить его можно через `import { Messenger } from 'im.public'` или `BX.Runtime.loadExtension('im.public.iframe')`: оба способа дают прямой доступ к рантайму мессенджера.

Приложение запускается в своем фрейме, на другом origin, и доступа к этому рантайму не имеет: ни `Messenger.*`, ни `BX.Runtime.loadExtension` из него не вызываются. Чтобы открыть чат из приложения, используйте [BX24.im.openMessenger](/sdk/bx24-js-sdk/additional-functions/bx24-im-open-messenger.html) или `$b24.parent.imOpenMessenger` из библиотеки [b24jssdk](https://bitrix24.github.io/b24jssdk/raw/docs/working-with-the-rest-api/frame-parent.md).

{% endnote %}
