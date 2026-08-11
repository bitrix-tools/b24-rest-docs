# Обзор событий при работе с карточкой звонка WebRTC-клиента

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События `BackgroundCallCard::*` позволяют приложению реагировать на действия оператора в карточке звонка и на изменения состояния интерфейса без дополнительного опроса.

{% note warning "" %}

Это события js-интерфейса точки встраивания, а не [события REST](../../../../events/index.md). У них нет серверного обработчика: приложение подписывается на них в браузере методом [BX24.placement.bindEvent](../../bx24-placement-bind-event.md). Зарегистрировать их методом `event.bind` нельзя, а метода REST `placement.bindEvent` не существует.

{% endnote %}

> Быстрый переход: [все события](#all-events)

## Как подписаться на события

1. Зарегистрируйте точку встраивания `PAGE_BACKGROUND_WORKER` методом [placement.bind](../../../placement-bind.md) — порядок описан в обзоре раздела [{#T}](../index.md)
2. В коде виджета подпишитесь на нужные события методом [BX24.placement.bindEvent](../../bx24-placement-bind-event.md)
3. Поднимите карточку звонка методом [telephony.externalCall.register](../../../../telephony/telephony-external-call-register.md). События приходят только для внешнего звонка приложения: при обычном звонке Битрикс24 карточка выглядит так же, но ни одно событие `BackgroundCallCard::*` не сработает
4. Дождитесь события [BackgroundCallCard::initialized](./initialized.md) и только после него управляйте карточкой командами [BX24.placement.call](../../bx24-placement-call.md)

```js
BX24.ready(function () {
    BX24.init(function () {
        BX24.placement.bindEvent('BackgroundCallCard::initialized', function (eventData) {
            console.log(eventData.CALL_ID);
        });

        BX24.placement.bindEvent('BackgroundCallCard::muteButtonClick', function (eventData) {
            // eventData = true, если оператор выключил микрофон
        });
    });
});
```

Подписываться нужно на каждое событие отдельно: подписки на все события сразу нет.

Отписаться от события интерфейса нельзя, а повторный вызов `BX24.placement.bindEvent` с тем же именем добавит второй обработчик, и приложение обработает событие дважды. Подписывайтесь один раз за загрузку виджета.

## Как выбрать событие

#|
|| **Сценарий** | **Что использовать** | **Что приходит в обработчик** ||
|| Приложение получило доступ к созданной карточке звонка | [BackgroundCallCard::initialized](initialized.md) | Стартовые данные звонка и привязки к CRM ||
|| Оператор нажимает кнопки управления звонком | [BackgroundCallCard::muteButtonClick](mute-button-click.md), [BackgroundCallCard::holdButtonClick](hold-button-click.md), [BackgroundCallCard::hangupButtonClick](hang-up-button-click.md), [BackgroundCallCard::answerButtonClick](answer-button-click.md) | Данные конкретного действия в интерфейсе ||
|| Оператор работает с переводом звонка | [BackgroundCallCard::transferButtonClick](transfer-button-click.md), [BackgroundCallCard::cancelTransferButtonClick](cancel-transfer-button-click.md), [BackgroundCallCard::completeTransferButtonClick](complete-transfer-button-click.md) | Данные по сценарию перевода ||
|| Карточка загрузила данные клиента из CRM, клиента опознали или в обзвоне сменился текущий клиент | [BackgroundCallCard::entityChanged](entity-changed.md) | Номер клиента и текущая CRM-привязка ||
|| Нужны дополнительные действия из интерфейса карточки, например сохранить комментарий, оценить качество связи или ввести цифру на клавиатуре | [BackgroundCallCard::addCommentButtonClick](add-comment-button-click.md), [BackgroundCallCard::dialpadButtonClick](dialpad-button-click.md), [BackgroundCallCard::qualityMeterClick](quality-meter-click.md), [BackgroundCallCard::notifyAdminButtonClick](notify-admin-button-click.md), [BackgroundCallCard::nextButtonClick](next-button-click.md), [BackgroundCallCard::skipButtonClick](skip-button-click.md), [BackgroundCallCard::makeCallButtonClick](make-call-button-click.md), [BackgroundCallCard::closeButtonClick](close-button-click.md) | Значение, выбранное пользователем, или параметры действия ||
|#

Какие кнопки видит оператор в каждом состоянии карточки и какое событие они вызывают, показано на странице [{#T}](../card.md).

## Обзор событий {#all-events}

> Scope: [`placement`](../../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** | **Данные в обработчике** ||
|| [BackgroundCallCard::initialized](initialized.md) | После создания карточки звонка | Объект с данными звонка ||
|| [BackgroundCallCard::addCommentButtonClick](add-comment-button-click.md) | При сохранении комментария в карточке звонка | Строка с текстом комментария ||
|| [BackgroundCallCard::muteButtonClick](mute-button-click.md) | При нажатии на кнопку выключения микрофона | `boolean` — состояние микрофона ||
|| [BackgroundCallCard::holdButtonClick](hold-button-click.md) | При нажатии на кнопку удержания звонка | `boolean` — состояние удержания ||
|| [BackgroundCallCard::closeButtonClick](close-button-click.md) | При нажатии на кнопку закрытия карточки звонка | Нет данных ||
|| [BackgroundCallCard::transferButtonClick](transfer-button-click.md) | При выборе оператора, на которого текущий оператор хочет перевести звонок | Объект с номером и целью перевода ||
|| [BackgroundCallCard::cancelTransferButtonClick](cancel-transfer-button-click.md) | При нажатии на кнопку «вернуться к звонку» | Нет данных ||
|| [BackgroundCallCard::completeTransferButtonClick](complete-transfer-button-click.md) | При нажатии на кнопку «перенаправить» | Нет данных ||
|| [BackgroundCallCard::hangupButtonClick](hang-up-button-click.md) | При нажатии на кнопку «завершить» | Нет данных ||
|| [BackgroundCallCard::nextButtonClick](next-button-click.md) | При нажатии на кнопку «следующий» | Нет данных ||
|| [BackgroundCallCard::skipButtonClick](skip-button-click.md) | При нажатии на кнопку «пропустить» | Нет данных ||
|| [BackgroundCallCard::answerButtonClick](answer-button-click.md) | При нажатии на кнопку «ответить» | Нет данных ||
|| [BackgroundCallCard::entityChanged](entity-changed.md) | При загрузке или смене связанного со звонком объекта CRM | Объект с номером и привязкой к CRM ||
|| [BackgroundCallCard::makeCallButtonClick](make-call-button-click.md) | При нажатии на кнопку «позвонить» или «перезвонить» | Нет данных ||
|| [BackgroundCallCard::qualityMeterClick](quality-meter-click.md) | При оценке качества связи | Строка с оценкой от 1 до 5 ||
|| [BackgroundCallCard::dialpadButtonClick](dialpad-button-click.md) | При нажатии на одну из цифровых кнопок телефона | Строка с нажатой клавишей ||
|| [BackgroundCallCard::notifyAdminButtonClick](notify-admin-button-click.md) | При нажатии на кнопку «уведомить администратора» | Нет данных ||
|#

## Типовые ошибки

#|
|| **Проблема** | **Причина и что сделать** ||
|| Обработчик не вызывается ни разу | Виджет открыт не в точке встраивания `PAGE_BACKGROUND_WORKER`. В других точках встраивания события `BackgroundCallCard::*` не зарегистрированы, и подписка молча не срабатывает ||
|| Виджет в нужной точке встраивания, но события не приходят | Звонок не внешний. События эмитятся только для карточки, поднятой методом [telephony.externalCall.register](../../../../telephony/telephony-external-call-register.md); для звонков самого Битрикс24 интерфейс молчит ||
|| Обработчик не вызывается только у одного события | Имя события набрано с ошибкой или в другом регистре. Список событий текущей точки встраивания возвращает [BX24.placement.getInterface](../../bx24-placement-get-interface.md) ||
|| События приходят, но команды управления карточкой возвращают ошибку | Команды вызваны до события [BackgroundCallCard::initialized](initialized.md), когда карточки еще нет ||
|| Приложение ждет подтверждения обработки события | События односторонние: вернуть значение в Битрикс24 из обработчика нельзя, реакция приложения — это отдельный вызов команды или метода REST ||
|| Приложение изменило карточку командой и ждет ответного события | Команды `CallCardSetMute` и `CallCardSetHold` меняют карточку напрямую, событий `muteButtonClick` и `holdButtonClick` при этом не возникает: они приходят только на действия оператора ||
|| Один обработчик срабатывает дважды | Подписка выполнена повторно. Отписки от событий интерфейса нет, поэтому подписывайтесь один раз за загрузку виджета ||
|#

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../card.md)
- [{#T}](../webrtc-scenario.md)
- [{#T}](../../bx24-placement-bind-event.md)
- [{#T}](../../../universal/background-worker.md)
- [{#T}](../../../placement-bind.md)
