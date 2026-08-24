# Управление карточкой звонка WebRTC-клиента: обзор команд и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Точку встраивания `PAGE_BACKGROUND_WORKER` используют приложения телефонии, которым нужно работать с карточкой звонка из фонового невидимого фрейма на страницах Битрикс24. Через js-интерфейс точки встраивания приложение меняет состояние карточки, управляет действиями оператора и обрабатывает события интерфейса.

{% note warning "" %}

Команды и события этого раздела — не методы REST. Приложение вызывает их в браузере через js-интерфейс точки встраивания: команды — методом [BX24.placement.call](../bx24-placement-call.md), подписку на события — методом [BX24.placement.bindEvent](../bx24-placement-bind-event.md). Запросов к `/rest/` с именами `CallCardSetUiState` или `BackgroundCallCard::initialized` не существует.

{% endnote %}

> Быстрый переход: [все команды и события](#all-methods)
>
> Пользовательская документация: [Карточка звонка](https://helpdesk.bitrix24.ru/open/18425138/)

## Как начать работу с PAGE_BACKGROUND_WORKER

1. Зарегистрируйте точку встраивания `PAGE_BACKGROUND_WORKER` методом [placement.bind](../../placement-bind.md). Метод доступен только администратору и только из контекста приложения: вебхуком точку не привязать
2. При регистрации передайте обязательный параметр `OPTIONS[errorHandlerUrl]`. Обработчик у приложения может быть только один, плюс отдельный персональный для конкретного пользователя — подробности в статье [{#T}](../../universal/background-worker.md)
3. Проверьте сценарий регистрации и требования к обработчику на странице [{#T}](./webrtc-scenario.md)
4. Зарегистрируйте звонок методом [telephony.externalCall.register](../../../telephony/telephony-external-call-register.md) — он же поднимает карточку звонка
5. Дождитесь события [BackgroundCallCard::initialized](./events/initialized.md). До него карточки нет, и любая команда вернет ошибку `Call card is undefined`
6. Управляйте карточкой командами через [BX24.placement.call](../bx24-placement-call.md) и подписывайтесь на действия оператора через [BX24.placement.bindEvent](../bx24-placement-bind-event.md)

Четвертый шаг обязателен. Команды и события работают только с карточкой внешнего звонка, поднятой самим приложением. При обычном звонке Битрикс24 карточка выглядит так же, но события `BackgroundCallCard::*` не приходят, а команды отвечают ошибкой `Call card is undefined`.

Минимальный рабочий цикл: приложение ждет создания карточки, переводит ее в нужное состояние и слушает кнопки оператора.

```js
BX24.ready(function () {
    BX24.init(function () {
        BX24.placement.bindEvent('BackgroundCallCard::initialized', function (eventData) {
            // карточка создана — теперь ей можно управлять
            BX24.placement.call('CallCardSetUiState', {uiState: 'connected'}, function (result) {
                console.log(result);
            });
        });

        BX24.placement.bindEvent('BackgroundCallCard::hangupButtonClick', function () {
            // оператор нажал «завершить» — завершаем звонок в своем WebRTC-клиенте
        });
    });
});
```

## Как устроен вызов команды точки встраивания

Команду вызывают по имени: первым аргументом [BX24.placement.call](../bx24-placement-call.md) передают имя команды, вторым — объект параметров, третьим — функцию обратного вызова.

Результат зависит от команды.

- Команды управления карточкой — `CallCardSetMute`, `CallCardSetHold`, `CallCardSetUiState`, `CallCardSetCardTitle`, `CallCardSetStatusText`, `CallCardClose` — передают в функцию обратного вызова пустой массив
- `CallCardGetListUiStates` возвращает массив доступных состояний интерфейса. Эта команда работает даже без активной карточки и своих кодов ошибок не имеет
- `CallCardStartTimer` и `CallCardStopTimer` в браузере не вызывают функцию обратного вызова вовсе: при успехе результата не будет. В десктоп-приложении Битрикс24 они возвращают пустой массив

Если карточки звонка нет, вместо результата приходит массив с объектом `{result: 'error', errorCode: 'Call card is undefined'}`. Если команду вызвали в другой точке встраивания, функция обратного вызова не сработает вовсе — интерфейс точки встраивания игнорирует незнакомую команду.

Часть проверок выполняет только десктоп-приложение Битрикс24: коды `missing field muted`, `missing field held`, `missing field title` и `missing field statusText` приходят из него. Формат у `missing field muted` отличается — этот код приходит одним объектом, без обертки в массив.

События приходят в функцию обратного вызова, переданную в [BX24.placement.bindEvent](../bx24-placement-bind-event.md). В обработчик попадают либо данные звонка и карточки, либо данные конкретного действия оператора — состав описан на странице каждого события.

Как устроена сама карточка, какие у нее области и какие кнопки доступны в каждом состоянии, показано на странице [{#T}](./card.md).

## Обзор команд и событий {#all-methods}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может выполнять команды: любой пользователь

{% list tabs %}

- Команды

    #|
    || **Команда** | **Описание** ||
    || [CallCardSetMute](./call-card-set-mute.md) | Выключает или включает микрофон оператора ||
    || [CallCardSetHold](./call-card-set-hold.md) | Ставит звонок на удержание или снимает с удержания ||
    || [CallCardSetUiState](./call-card-set-ui-state.md) | Меняет состояние интерфейса карточки звонка ||
    || [CallCardGetListUiStates](./call-card-get-list-ui-states.md) | Возвращает доступные состояния интерфейса карточки ||
    || [CallCardSetCardTitle](./call-card-set-card-title.md) | Меняет заголовок карточки звонка ||
    || [CallCardSetStatusText](./call-card-set-status-text.md) | Меняет текст в центральной части карточки ||
    || [CallCardStartTimer](./call-card-start-timer.md) | Показывает таймер и запускает отсчет времени разговора ||
    || [CallCardStopTimer](./call-card-stop-timer.md) | Останавливает отсчет времени разговора ||
    || [CallCardClose](./call-card-close.md) | Закрывает карточку звонка ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [BackgroundCallCard::initialized](./events/initialized.md) | После создания карточки звонка ||
    || [BackgroundCallCard::addCommentButtonClick](./events/add-comment-button-click.md) | При сохранении комментария в карточке звонка ||
    || [BackgroundCallCard::muteButtonClick](./events/mute-button-click.md) | При нажатии на кнопку выключения микрофона ||
    || [BackgroundCallCard::holdButtonClick](./events/hold-button-click.md) | При нажатии на кнопку удержания звонка ||
    || [BackgroundCallCard::closeButtonClick](./events/close-button-click.md) | При нажатии на кнопку закрытия карточки звонка ||
    || [BackgroundCallCard::transferButtonClick](./events/transfer-button-click.md) | При выборе оператора для перевода звонка ||
    || [BackgroundCallCard::cancelTransferButtonClick](./events/cancel-transfer-button-click.md) | При нажатии на кнопку «вернуться к звонку» ||
    || [BackgroundCallCard::completeTransferButtonClick](./events/complete-transfer-button-click.md) | При нажатии на кнопку «перенаправить» ||
    || [BackgroundCallCard::hangupButtonClick](./events/hang-up-button-click.md) | При нажатии на кнопку «завершить» ||
    || [BackgroundCallCard::nextButtonClick](./events/next-button-click.md) | При нажатии на кнопку «следующий» ||
    || [BackgroundCallCard::skipButtonClick](./events/skip-button-click.md) | При нажатии на кнопку «пропустить» ||
    || [BackgroundCallCard::answerButtonClick](./events/answer-button-click.md) | При нажатии на кнопку «ответить» ||
    || [BackgroundCallCard::entityChanged](./events/entity-changed.md) | При загрузке или смене связанного со звонком объекта CRM ||
    || [BackgroundCallCard::makeCallButtonClick](./events/make-call-button-click.md) | При нажатии на кнопку «позвонить» или «перезвонить» ||
    || [BackgroundCallCard::qualityMeterClick](./events/quality-meter-click.md) | При оценке качества связи ||
    || [BackgroundCallCard::dialpadButtonClick](./events/dialpad-button-click.md) | При нажатии на одну из цифровых кнопок телефона ||
    || [BackgroundCallCard::notifyAdminButtonClick](./events/notify-admin-button-click.md) | При нажатии на кнопку «уведомить администратора» ||
    |#

{% endlist %}

## Типовые ошибки

#|
|| **Проблема** | **Причина и что сделать** ||
|| Команда возвращает `Call card is undefined` | Карточки звонка нет или звонок не зарегистрирован методом `telephony.externalCall.register`. Вызывайте команды только после события [BackgroundCallCard::initialized](./events/initialized.md) ||
|| Функция обратного вызова не срабатывает вовсе | Виджет открыт не в точке встраивания `PAGE_BACKGROUND_WORKER` либо имя команды набрано с ошибкой. Сверьте список доступных команд методом [BX24.placement.getInterface](../bx24-placement-get-interface.md). У команд `CallCardStartTimer` и `CallCardStopTimer` молчание в браузере — штатное поведение при успехе ||
|| Виджет в нужной точке встраивания, но события не приходят и команды дают `Call card is undefined` | Звонок не внешний. Карточку должен поднять сам обработчик методом [telephony.externalCall.register](../../../telephony/telephony-external-call-register.md); для звонков самого Битрикс24 этот интерфейс не работает ||
|| Команда `CallCardSetUiState` возвращает `Invalid ui state` | Состояние отсутствует в списке поддерживаемых. Получите список командой [CallCardGetListUiStates](./call-card-get-list-ui-states.md) ||
|| Обработчик перестал вызываться, регистрация пропала | Виджет отвечал дольше пяти секунд больше десяти раз за сутки, и Битрикс24 удалил регистрацию, сообщив об этом на `OPTIONS[errorHandlerUrl]`. Подробности — в статье [{#T}](../../universal/background-worker.md) ||
|#

## Продолжите изучение

- [{#T}](./webrtc-scenario.md)
- [{#T}](./card.md)
- [{#T}](./events/index.md)
- [{#T}](../../universal/background-worker.md)
- [{#T}](../index.md)
