# Как интегрировать внешнюю телефонию с Битрикс24

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Внешняя телефония передает в Битрикс24 данные о звонках из АТС: номер клиента, пользователя, линию, статус разговора и запись. Битрикс24 показывает карточку звонка сотруднику, связывает звонок с CRM и сохраняет результат в статистике.

Чтобы интегрировать внешнюю телефонию, выполним шесть шагов:

1. Соберем приложение и обработчики для АТС и Битрикс24
2. Зарегистрируем входящий звонок
3. Покажем карточку звонка группе сотрудников
4. Направим звонок ответственному за клиента
5. Обработаем исходящий звонок из CRM
6. Завершим звонок и сохраним результат

Отдельно разберем сценарий, когда звонок нужно зафиксировать без показа карточки.

## 1. Соберем приложение

Рабочая интеграция обычно состоит из двух частей:

- серверного приложения
- обработчиков для АТС и Битрикс24

1. Создайте [локальное приложение](../../settings/app-installation/local-apps/index.md) или приложение для Маркета
2. Завершите установку приложения и сохраните авторизацию по правилам [установки приложения](../../settings/app-installation/installation-finish.md)
3. Зарегистрируйте внешнюю линию методом [telephony.externalLine.add](../../api-reference/telephony/telephony-external-line-add.md). Номер линии передавайте в `LINE_NUMBER` метода [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md)
4. Подпишите приложение на [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) методом [event.bind](../../api-reference/events/event-bind.md), если нужно запускать исходящие звонки из CRM
5. Создайте обработчик входящих событий от АТС. Он должен вызывать методы по состоянию звонка:
   - [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md) — зарегистрировать звонок
   - [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md) — показать карточку звонка
   - [telephony.externalCall.hide](../../api-reference/telephony/telephony-external-call-hide.md) — скрыть карточку звонка
   - [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md) — завершить звонок
6. Создайте обработчик [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md). Он должен принять данные события:
   - `CALL_ID` — идентификатор звонка, который нужно завершить после разговора
   - `PHONE_NUMBER` — номер клиента, на который нужно позвонить
   - `USER_ID` — идентификатор сотрудника, который начал звонок

   После этого обработчик запускает звонок на стороне АТС и завершает тот же `CALL_ID` методом [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md).
7. Если запись разговора появляется после завершения звонка, прикрепите ее методом [telephony.externalCall.attachRecord](../../api-reference/telephony/telephony-external-call-attach-record.md)

Для PHP-приложений можно использовать [CRest PHP SDK](../../sdk/crest-php-sdk/index.md). Не храните токены в публичном файле приложения и не отключайте проверку SSL-сертификата при REST-запросах.

## 2. Зарегистрируем входящий звонок

Когда АТС получает входящий звонок, вызовите [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md). Передайте:

- `USER_ID` — идентификатор сотрудника, которому нужно показать карточку звонка
- `PHONE_NUMBER` — номер клиента
- `TYPE = 2` — входящий звонок
- `LINE_NUMBER` — номер внешней линии
- `EXTERNAL_CALL_ID` — уникальный идентификатор звонка на стороне АТС

Метод вернет `CALL_ID`. Этот идентификатор нужен для следующих действий со звонком:

- показать карточку через [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md)
- скрыть карточку через [telephony.externalCall.hide](../../api-reference/telephony/telephony-external-call-hide.md)
- завершить звонок через [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md)
- добавить запись через [telephony.externalCall.attachRecord](../../api-reference/telephony/telephony-external-call-attach-record.md)

Если передать `SHOW = 1` или не передавать `SHOW`, карточка откроется у пользователя из `USER_ID`.

## 3. Покажем звонок группе сотрудников

Для очереди операторов сначала зарегистрируйте звонок методом [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md), а затем управляйте карточкой по `CALL_ID`.

Для очереди можно зарегистрировать звонок на первого оператора, а затем показать карточку другим сотрудникам методом [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md).

**Одновременная очередь.** Передайте массив идентификаторов сотрудников в `USER_ID` метода [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md). Битрикс24 покажет карточку нескольким сотрудникам. Когда АТС выберет оператора, скройте карточку у остальных методом [telephony.externalCall.hide](../../api-reference/telephony/telephony-external-call-hide.md).

**Последовательная очередь.** Покажите карточку первому сотруднику методом [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md). Если сотрудник не ответил за время, заданное в АТС, скройте карточку методом [telephony.externalCall.hide](../../api-reference/telephony/telephony-external-call-hide.md) и покажите ее следующему сотруднику через [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md).

В примере карточка сначала показывается трем сотрудникам. Когда сотрудник с идентификатором `1270` отвечает на звонок, карточка скрывается у остальных.

{% list tabs %}

- JS

    ```js
    const queue = [1269, 1270, 1271];

    await $b24.callMethod(
        'telephony.externalCall.show',
        {
            CALL_ID: callId,
            USER_ID: queue
        }
    );

    const answeredUserId = 1270;
    const usersToHide = queue.filter((userId) => userId !== answeredUserId);

    await $b24.callMethod(
        'telephony.externalCall.hide',
        {
            CALL_ID: callId,
            USER_ID: usersToHide
        }
    );
    ```

- PHP

    ```php
    $queue = [1269, 1270, 1271];

    CRest::call(
        'telephony.externalCall.show',
        [
            'CALL_ID' => $callId,
            'USER_ID' => $queue
        ]
    );

    $answeredUserId = 1270;
    $usersToHide = array_values(
        array_filter(
            $queue,
            fn($userId) => $userId !== $answeredUserId
        )
    );

    CRest::call(
        'telephony.externalCall.hide',
        [
            'CALL_ID' => $callId,
            'USER_ID' => $usersToHide
        ]
    );
    ```

{% endlist %}

## 4. Направим звонок ответственному за клиента

Если нужно показать входящий звонок ответственному менеджеру, сначала зарегистрируйте звонок с `SHOW = 0` методом [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md). Битрикс24 проверит номер в CRM и вернет данные найденного или созданного объекта:

- `CRM_ENTITY_TYPE` — тип найденного объекта CRM
- `CRM_ENTITY_ID` — идентификатор найденного объекта CRM
- `CRM_CREATED_LEAD` — идентификатор созданного лида, если включено автосоздание
- `CRM_CREATED_ENTITIES` — массив созданных объектов CRM, если включено автосоздание

По найденному объекту CRM получите ответственного сотрудника методами CRM и передайте его идентификатор в [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md). Если нужно только найти клиента по телефону без регистрации звонка, используйте [telephony.externalCall.searchCrmEntities](../../api-reference/telephony/telephony-external-call-search-crm-entities.md).

## 5. Обработаем исходящий звонок из CRM

Когда сотрудник нажимает на номер телефона в CRM, Битрикс24 регистрирует звонок и отправляет приложению событие [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md). В обработчик события приходят:

- `PHONE_NUMBER` — номер клиента
- `USER_ID` — идентификатор сотрудника, который начал звонок
- `CALL_ID` — идентификатор зарегистрированного звонка
- `LINE_NUMBER` — номер внешней линии
- `CRM_ENTITY_TYPE` — тип объекта CRM, из которого начат звонок
- `CRM_ENTITY_ID` — идентификатор объекта CRM
- `CALL_LIST_ID` — идентификатор списка обзвона, если звонок запущен из списка обзвона

После получения [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) приложение должно инициировать вызов на стороне АТС. Когда разговор закончится, завершите тот же `CALL_ID` методом [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md).

Если звонок идет из списка обзвона, используйте `CALL_LIST_ID` из [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) при обработке звонка на стороне приложения. Завершайте звонок по `CALL_ID` из события, чтобы результат сохранился в привязке к обзвону.

## 6. Завершим звонок и сохраним результат

После окончания разговора вызовите [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md). Метод скрывает карточку звонка, сохраняет запись в статистике и создает или обновляет CRM-дело звонка.

Передайте в [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md):

- `CALL_ID` — идентификатор из [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md) или [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md)
- `USER_ID` — сотрудник, за которым нужно сохранить звонок
- `DURATION` — длительность разговора в секундах
- `STATUS_CODE` — результат звонка, например `200` для успешного разговора или `304` для пропущенного входящего

Если запись разговора еще не готова, используйте один из двух порядков:

- вызовите [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md) без записи, чтобы сразу сохранить звонок в статистике и CRM-деле. Когда запись будет готова, прикрепите ее методом [telephony.externalCall.attachRecord](../../api-reference/telephony/telephony-external-call-attach-record.md)
- скройте карточку методом [telephony.externalCall.hide](../../api-reference/telephony/telephony-external-call-hide.md), а [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md) вызовите после готовности записи. В этом случае звонок появится в статистике и CRM-деле только после вызова [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md)

После прикрепления записи можно добавить расшифровку методом [telephony.call.attachTranscription](../../api-reference/telephony/telephony-call-attach-transcription.md). Метод работает только для завершенного звонка, который уже есть в статистике.

## Зафиксируем звонок без показа карточки

Если во время звонка связь между АТС и Битрикс24 была недоступна, после восстановления связи можно сохранить факт звонка без карточки. Для этого вызовите [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md) с `SHOW = 0`, а затем [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md) с фактическими данными звонка.

Такой сценарий не показывает звонок сотруднику в реальном времени, но сохраняет историю, статистику и CRM-дело.

## Пример

Пример показывает минимальный цикл для входящего звонка: регистрация, показ карточки другому сотруднику и завершение.

{% list tabs %}

- JS

    ```js
    const registerResult = await $b24.callMethod(
        'telephony.externalCall.register',
        {
            USER_ID: 1269,
            PHONE_NUMBER: '79062195047',
            TYPE: 2,
            LINE_NUMBER: '3',
            EXTERNAL_CALL_ID: 'asterisk-1773130778.18441',
            SHOW: 1
        }
    );

    const callId = registerResult.getData().result.CALL_ID;

    await $b24.callMethod(
        'telephony.externalCall.show',
        {
            CALL_ID: callId,
            USER_ID: 1270
        }
    );

    await $b24.callMethod(
        'telephony.externalCall.finish',
        {
            CALL_ID: callId,
            USER_ID: 1270,
            DURATION: 95,
            STATUS_CODE: '200',
            ADD_TO_CHAT: 1
        }
    );
    ```

- PHP

    ```php
    $registerResult = CRest::call(
        'telephony.externalCall.register',
        [
            'USER_ID' => 1269,
            'PHONE_NUMBER' => '79062195047',
            'TYPE' => 2,
            'LINE_NUMBER' => '3',
            'EXTERNAL_CALL_ID' => 'asterisk-1773130778.18441',
            'SHOW' => 1
        ]
    );

    $callId = $registerResult['result']['CALL_ID'];

    CRest::call(
        'telephony.externalCall.show',
        [
            'CALL_ID' => $callId,
            'USER_ID' => 1270
        ]
    );

    CRest::call(
        'telephony.externalCall.finish',
        [
            'CALL_ID' => $callId,
            'USER_ID' => 1270,
            'DURATION' => 95,
            'STATUS_CODE' => '200',
            'ADD_TO_CHAT' => 1
        ]
    );
    ```

{% endlist %}

## Продолжите изучение

- [Обзор методов телефонии](../../api-reference/telephony/index.md)
- [События телефонии](../../api-reference/telephony/events/index.md)
- [Вкладка в карточке звонка CALL_CARD](../../api-reference/widgets/telephony/index.md)
