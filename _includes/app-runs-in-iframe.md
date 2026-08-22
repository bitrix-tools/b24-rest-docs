{% note alert "Приложение работает во фрейме" %}

Приложение запускается в своем фрейме, на другом origin. Рантайма Битрикс24 там нет — из приложения не вызываются ни `Messenger.*`, ни `BX.Runtime.loadExtension`.

Единственный канал наружу — мост к родительскому окну: методы `BX24.im.*` или их аналоги `$b24.parent.imCallTo`, `$b24.parent.imPhoneTo`, `$b24.parent.imOpenMessenger` и `$b24.parent.imOpenHistory` в библиотеке [b24jssdk](https://bitrix24.github.io/b24jssdk/raw/docs/working-with-the-rest-api/frame-parent.md).

При вызове этих методов в консоли портала печатается deprecation-нотис с рекомендацией перейти на `Messenger.startVideoCall`, `Messenger.startPhoneCall` или `Messenger.openChat`. Не обращайте на него внимания: это методы верхнего окна, доступные только коду на самой странице Битрикс24, и из приложения они недостижимы. Расширение `im.public.iframe`, которое называет нотис, предназначено для фрейма на домене портала, а не для фрейма приложения. Про этот случай — [Передача контекста боту при открытии чата](/api-reference/chat-bots/chat-bots-v2/imbot.v2/bot-context.html).

{% endnote %}
