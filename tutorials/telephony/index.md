# Как интегрировать внешнюю телефонию с Битрикс24

> Scope: [`telephony`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно установленное приложение с OAuth-авторизацией
>
> - [telephony.externalLine.add](../../api-reference/telephony/telephony-external-line-add.md), [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md), [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md) и [event.bind](../../api-reference/events/event-bind.md) — пользователь, под которым приложение получило OAuth-авторизацию
> - [telephony.externalCall.searchCrmEntities](../../api-reference/telephony/telephony-external-call-search-crm-entities.md), [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md), [telephony.externalCall.hide](../../api-reference/telephony/telephony-external-call-hide.md), [telephony.externalCall.attachRecord](../../api-reference/telephony/telephony-external-call-attach-record.md) и [telephony.call.attachTranscription](../../api-reference/telephony/telephony-call-attach-transcription.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Внешняя телефония передает в Битрикс24 данные о звонках из АТС: номер клиента, пользователя, линию, статус разговора и запись. Битрикс24 показывает карточку звонка сотруднику, связывает звонок с CRM и сохраняет результат в статистике.

Сценарий состоит из шести шагов.

1. Соберем приложение и обработчики для АТС и Битрикс24
2. Зарегистрируем входящий звонок
3. Покажем карточку звонка группе сотрудников
4. Направим звонок ответственному за клиента
5. Обработаем исходящий звонок из CRM
6. Завершим звонок и сохраним результат

Отдельно разберем сценарий, когда звонок нужно зафиксировать без показа карточки.

{% note info "" %}

Методы `telephony.externalLine.add`, `telephony.externalCall.register` и `telephony.externalCall.finish` работают только в контексте приложения. Входящий вебхук для них не подходит. Событие [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) (шаг 5) принимает ваш веб-сервер.

В PHP методы телефонии вызываются напрямую через ядро (`$b24->core->call(...)`). Типизированные аналоги есть в `getTelephonyScope()->externalCall()` (`show`, `hide`, `register`, `finishForUserId`) и `->externalLine()`, но они требуют объектов-значений (`CallType`, `TelephonyCallStatusCode`, `Money`, `CarbonImmutable`).

{% endnote %}

## Что нужно до начала

Перед началом убедитесь, что у вас есть:

- локальное или тиражное приложение со scope `telephony` и сохраненной OAuth-авторизацией
- публичный HTTPS-обработчик приложения, если нужно принимать событие `ONEXTERNALCALLSTART`. Входящий вебхук не получает это событие
- идентификатор сотрудника `USER_ID`, которому будет показана карточка звонка
- номер внешней линии `LINE_NUMBER`, например `line-1`
- уникальный идентификатор звонка на стороне АТС `EXTERNAL_CALL_ID`
- публичный URL записи разговора, если запись передается методом `telephony.externalCall.attachRecord`

Значения `your-domain.bitrix24.ru`, `1269`, `1270`, `1271`, `line-1`, `asterisk-1773130778.18441` и URL записи замените на данные своего Битрикс24, сотрудников, линии и АТС.

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Инициализация SDK

В примерах ниже `$b24` для JS, `$b24` для PHP и `client` для Python — уже инициализированные клиенты с OAuth-токеном установленного приложения. Получение, хранение и продление OAuth-токенов описаны в статье [Полный протокол авторизации OAuth 2.0](../../settings/oauth/index.md).

## 1. Соберем приложение

Рабочая интеграция обычно состоит из серверного приложения и обработчиков для АТС и Битрикс24:

1. Создайте [локальное приложение](../../settings/app-installation/local-apps/index.md) или приложение для Маркета
2. Завершите установку приложения и сохраните авторизацию
3. Зарегистрируйте внешнюю линию методом [telephony.externalLine.add](../../api-reference/telephony/telephony-external-line-add.md). Номер линии передавайте в `LINE_NUMBER` метода [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md)
4. Подпишите приложение на [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) методом [event.bind](../../api-reference/events/event-bind.md), если нужно запускать исходящие звонки из CRM
5. Создайте обработчик событий от АТС, который вызывает `telephony.externalCall.register/show/hide/finish` по состоянию звонка
6. Создайте обработчик [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) для исходящих звонков
7. Если запись разговора появляется после завершения, прикрепите ее методом [telephony.externalCall.attachRecord](../../api-reference/telephony/telephony-external-call-attach-record.md)

Регистрация внешней линии создает номер, который связывает звонки с приложением. Этот номер передавайте в `LINE_NUMBER` при регистрации звонка.

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'telephony.externalLine.add',
        params: { NUMBER: 'line-1', NAME: 'Внешняя линия' },
        requestId: 'line-add',
    })
    ```

- PHP

    ```php
    $b24->core->call('telephony.externalLine.add', [
        'NUMBER' => 'line-1',
        'NAME' => 'Внешняя линия',
    ]);
    ```

- Python

    ```python
    client.telephony.external_line.add(number="line-1", name="Внешняя линия").response
    ```

{% endlist %}

Успешный ответ содержит идентификатор созданной линии.

```json
{
    "result": {
        "ID": 7
    }
}
```

Если нужно обрабатывать исходящие звонки из CRM, подпишите приложение на событие `ONEXTERNALCALLSTART`. В `handler` передайте публичный HTTPS URL вашего обработчика.

{% list tabs %}

- JS

    ```js
    await $b24.actions.v2.call.make({
        method: 'event.bind',
        params: {
            event: 'ONEXTERNALCALLSTART',
            handler: 'https://your-domain.example/events',
        },
        requestId: 'event-bind',
    })
    ```

- PHP

    ```php
    $b24->core->call('event.bind', [
        'event' => 'ONEXTERNALCALLSTART',
        'handler' => 'https://your-domain.example/events',
    ]);
    ```

- Python

    ```python
    client.event.bind(
        event="ONEXTERNALCALLSTART",
        handler="https://your-domain.example/events",
    ).response
    ```

{% endlist %}

Успешная подписка возвращает `true`.

```json
{
    "result": true
}
```

## 2. Зарегистрируем входящий звонок

Когда АТС получает входящий звонок, вызовите [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md):

- `USER_ID` — сотрудник, которому показать карточку
- `PHONE_NUMBER` — номер клиента
- `TYPE = 2` — входящий звонок
- `LINE_NUMBER` — номер внешней линии
- `EXTERNAL_CALL_ID` — уникальный идентификатор звонка на стороне АТС
- `SHOW = 1` (или не передавать) — карточка откроется у пользователя из `USER_ID`

Метод вернет `CALL_ID` для дальнейших действий (`show`, `hide`, `finish`, `attachRecord`).

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.register',
        params: {
            USER_ID: 1269,
            PHONE_NUMBER: '79062195047',
            TYPE: 2,
            LINE_NUMBER: 'line-1',
            EXTERNAL_CALL_ID: 'asterisk-1773130778.18441',
            SHOW: 1,
        },
        requestId: 'call-register',
    })

    const callId = response.getData().result.CALL_ID
    ```

- PHP

    ```php
    $response = $b24->core->call('telephony.externalCall.register', [
        'USER_ID' => 1269,
        'PHONE_NUMBER' => '79062195047',
        'TYPE' => 2,
        'LINE_NUMBER' => 'line-1',
        'EXTERNAL_CALL_ID' => 'asterisk-1773130778.18441',
        'SHOW' => 1,
    ]);

    $callId = $response->getResponseData()->getResult()['CALL_ID'];
    ```

- Python

    ```python
    bitrix_response = client.telephony.external_call.register(
        phone_number="79062195047",
        call_type=2,
        user_id=1269,
        line_number="line-1",
        external_call_id="asterisk-1773130778.18441",
        show=1,
    ).response
    call_id = bitrix_response.result["CALL_ID"]
    ```

{% endlist %}

Успешный ответ содержит `CALL_ID`. Сохраните его: этот идентификатор нужен для показа, скрытия, завершения звонка и прикрепления записи.

```json
{
    "result": {
        "CALL_ID": "externalCall.716f1cb73def9700a23842adf9c4c568.1773130779",
        "CRM_CREATED_LEAD": null,
        "CRM_CREATED_ENTITIES": [],
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": 797
    }
}
```

## 3. Покажем звонок группе сотрудников

**Одновременная очередь.** Передайте массив идентификаторов сотрудников в `USER_ID` метода [telephony.externalCall.show](../../api-reference/telephony/telephony-external-call-show.md). Когда оператор ответит, скройте карточку у остальных методом [telephony.externalCall.hide](../../api-reference/telephony/telephony-external-call-hide.md).

В примере карточка показывается трем сотрудникам, затем, когда отвечает сотрудник `1270`, скрывается у остальных.

{% list tabs %}

- JS

    ```js
    const queue = [1269, 1270, 1271]

    await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.show',
        params: { CALL_ID: callId, USER_ID: queue },
        requestId: 'call-show',
    })

    const answeredUserId = 1270
    const usersToHide = queue.filter((userId) => userId !== answeredUserId)

    await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.hide',
        params: { CALL_ID: callId, USER_ID: usersToHide },
        requestId: 'call-hide',
    })
    ```

- PHP

    ```php
    $queue = [1269, 1270, 1271];

    // Типизированный аналог: $b24->getTelephonyScope()->externalCall()->show($callId, $queue);
    $b24->core->call('telephony.externalCall.show', [
        'CALL_ID' => $callId,
        'USER_ID' => $queue,
    ]);

    $answeredUserId = 1270;
    $usersToHide = array_values(array_filter($queue, fn($userId) => $userId !== $answeredUserId));

    $b24->core->call('telephony.externalCall.hide', [
        'CALL_ID' => $callId,
        'USER_ID' => $usersToHide,
    ]);
    ```

- Python

    ```python
    queue = [1269, 1270, 1271]
    client.telephony.external_call.show(call_id=call_id, user_id=queue).response

    answered_user_id = 1270
    users_to_hide = [uid for uid in queue if uid != answered_user_id]
    client.telephony.external_call.hide(call_id=call_id, user_id=users_to_hide).response
    ```

{% endlist %}

Методы `show` и `hide` возвращают `true`, если команда показа или скрытия карточки отправлена.

```json
{
    "result": true
}
```

**Последовательная очередь.** Покажите карточку первому сотруднику методом `show`. Если он не ответил за заданное в АТС время, скройте карточку методом `hide` и покажите следующему сотруднику методом `show`.

## 4. Направим звонок ответственному за клиента

Чтобы показать звонок ответственному менеджеру, сначала найдите клиента по телефону методом [telephony.externalCall.searchCrmEntities](../../api-reference/telephony/telephony-external-call-search-crm-entities.md). Метод вернет найденные объекты CRM и `ASSIGNED_BY_ID` — идентификатор ответственного сотрудника.

Затем зарегистрируйте звонок методом `telephony.externalCall.register` с параметрами:

- `USER_ID` — `ASSIGNED_BY_ID` из результата поиска
- `PHONE_NUMBER` — номер клиента
- `TYPE = 2` — входящий звонок
- `LINE_NUMBER` — номер внешней линии
- `EXTERNAL_CALL_ID` — уникальный идентификатор звонка на стороне АТС
- `SHOW = 0` — не показывать карточку сразу после регистрации

После регистрации передайте `CALL_ID` и `ASSIGNED_BY_ID` в `telephony.externalCall.show`.

{% list tabs %}

- JS

    ```js
    const crmSearch = await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.searchCrmEntities',
        params: { PHONE_NUMBER: '79062195047' },
        requestId: 'crm-search',
    })

    const crmEntities = crmSearch.getData().result
    if (!crmEntities.length) {
        throw new Error('Клиент с таким телефоном не найден в CRM')
    }

    const assignedById = Number(crmEntities[0].ASSIGNED_BY_ID)

    const reg = await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.register',
        params: {
            USER_ID: assignedById,
            PHONE_NUMBER: '79062195047',
            TYPE: 2,
            LINE_NUMBER: 'line-1',
            EXTERNAL_CALL_ID: 'asterisk-1773130778.18441-manager',
            SHOW: 0,
        },
        requestId: 'call-register',
    })

    const callId = reg.getData().result.CALL_ID

    await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.show',
        params: { CALL_ID: callId, USER_ID: assignedById },
        requestId: 'call-show',
    })
    ```

- PHP

    ```php
    $crmEntities = $b24->core->call('telephony.externalCall.searchCrmEntities', [
        'PHONE_NUMBER' => '79062195047',
    ])->getResponseData()->getResult();

    if (empty($crmEntities)) {
        throw new \RuntimeException('Клиент с таким телефоном не найден в CRM');
    }

    $assignedById = (int)$crmEntities[0]['ASSIGNED_BY_ID'];

    $reg = $b24->core->call('telephony.externalCall.register', [
        'USER_ID' => $assignedById,
        'PHONE_NUMBER' => '79062195047',
        'TYPE' => 2,
        'LINE_NUMBER' => 'line-1',
        'EXTERNAL_CALL_ID' => 'asterisk-1773130778.18441-manager',
        'SHOW' => 0,
    ])->getResponseData()->getResult();

    $b24->core->call('telephony.externalCall.show', [
        'CALL_ID' => $reg['CALL_ID'],
        'USER_ID' => $assignedById,
    ]);
    ```

- Python

    ```python
    crm_entities = client.telephony.external_call.search_crm_entities(
        phone_number="79062195047",
    ).response.result

    if not crm_entities:
        raise RuntimeError("Клиент с таким телефоном не найден в CRM")

    assigned_by_id = int(crm_entities[0]["ASSIGNED_BY_ID"])

    reg = client.telephony.external_call.register(
        phone_number="79062195047",
        call_type=2,
        user_id=assigned_by_id,
        line_number="line-1",
        external_call_id="asterisk-1773130778.18441-manager",
        show=0,
    ).response.result

    client.telephony.external_call.show(
        call_id=reg["CALL_ID"],
        user_id=assigned_by_id,
    ).response
    ```

{% endlist %}

В ответе `register` сохраните `CALL_ID`. Он нужен для завершения звонка и прикрепления записи.

## 5. Обработаем исходящий звонок из CRM

Когда сотрудник нажимает на номер в CRM, Битрикс24 регистрирует звонок и отправляет приложению событие [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) с полями `CALL_ID`, `PHONE_NUMBER`, `USER_ID`, `LINE_NUMBER`, `CRM_ENTITY_TYPE`, `CRM_ENTITY_ID`, `CALL_LIST_ID`.

Событие принимает ваш веб-сервер. После запуска вызова на АТС завершите тот же `CALL_ID` методом `finish`. Поле `CALL_ID` приходит в событии, поэтому для исходящего звонка не нужно повторно вызывать `register`.

{% list tabs %}

- JS

    ```js
    import express from 'express'
    const app = express()
    app.use(express.urlencoded({ extended: true }))

    app.post('/events', async (req, res) => {
        if (req.body.event === 'ONEXTERNALCALLSTART') {
            const data = req.body.data
            // ... инициировать вызов на АТС по data.PHONE_NUMBER ...
            // по завершении разговора:
            await $b24.actions.v2.call.make({
                method: 'telephony.externalCall.finish',
                params: { CALL_ID: data.CALL_ID, USER_ID: data.USER_ID, DURATION: 95, STATUS_CODE: '200' },
                requestId: 'call-finish',
            })
        }
        res.send('ok')
    })
    ```

- PHP

    ```php
    <?php
    // Обработчик события ONEXTERNALCALLSTART
    if (($_REQUEST['event'] ?? '') === 'ONEXTERNALCALLSTART') {
        $data = $_REQUEST['data'];
        // ... инициировать вызов на АТС по $data['PHONE_NUMBER'] ...
        $b24->core->call('telephony.externalCall.finish', [
            'CALL_ID' => $data['CALL_ID'],
            'USER_ID' => $data['USER_ID'],
            'DURATION' => 95,
            'STATUS_CODE' => '200',
        ]);
    }
    ```

- Python

    ```python
    from flask import Flask, request
    app = Flask(__name__)

    @app.post("/events")
    def events():
        if request.form.get("event") == "ONEXTERNALCALLSTART":
            data = request.form  # поля приходят как data[CALL_ID] и т.д.
            # ... инициировать вызов на АТС ...
            client.telephony.external_call.finish(
                call_id=data.get("data[CALL_ID]"),
                user_id=int(data.get("data[USER_ID]")),
                duration=95,
                status_code="200",
            ).response
        return "ok"
    ```

{% endlist %}

Обработчик должен вернуть HTTP-ответ `200`. После этого Битрикс24 считает событие доставленным.

## 6. Завершим звонок и сохраним результат

После разговора вызовите [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md): метод скрывает карточку, сохраняет звонок в статистике и создает CRM-дело. Передайте `CALL_ID`, `USER_ID`, `DURATION` (сек) и `STATUS_CODE` (`200` — успешно, `304` — пропущенный).

Если запись еще не готова, вызовите `finish` без записи, а позже прикрепите ее методом [telephony.externalCall.attachRecord](../../api-reference/telephony/telephony-external-call-attach-record.md). После записи можно добавить расшифровку методом [telephony.call.attachTranscription](../../api-reference/telephony/telephony-call-attach-transcription.md).

{% list tabs %}

- JS

    ```js
    const finishResponse = await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.finish',
        params: { CALL_ID: callId, USER_ID: 1270, DURATION: 95, STATUS_CODE: '200', ADD_TO_CHAT: 1 },
        requestId: 'call-finish',
    })

    // позже, когда запись готова
    await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.attachRecord',
        params: { CALL_ID: callId, FILENAME: 'record.mp3', RECORD_URL: 'https://your-domain.example/record.mp3' },
        requestId: 'attach-record',
    })
    ```

- PHP

    ```php
    $finishResponse = $b24->core->call('telephony.externalCall.finish', [
        'CALL_ID' => $callId, 'USER_ID' => 1270, 'DURATION' => 95, 'STATUS_CODE' => '200', 'ADD_TO_CHAT' => 1,
    ]);

    // позже, когда запись готова
    $b24->core->call('telephony.externalCall.attachRecord', [
        'CALL_ID' => $callId, 'FILENAME' => 'record.mp3', 'RECORD_URL' => 'https://your-domain.example/record.mp3',
    ]);
    ```

- Python

    ```python
    finish_response = client.telephony.external_call.finish(
        call_id=call_id, user_id=1270, duration=95, status_code="200", add_to_chat=1,
    ).response

    # позже, когда запись готова
    client.telephony.external_call.attach_record(
        call_id=call_id, filename="record.mp3", record_url="https://your-domain.example/record.mp3",
    ).response
    ```

{% endlist %}

Успешный ответ `finish` содержит запись статистики звонка. Поля `CALL_STATUS`, `CALL_FAILED_CODE`, `CRM_ACTIVITY_ID`, `CRM_ENTITY_TYPE` и `CRM_ENTITY_ID` помогают проверить, что звонок завершен и связан с CRM.

```json
{
    "result": {
        "CALL_ID": "externalCall.716f1cb73def9700a23842adf9c4c568.1773130779",
        "PORTAL_USER_ID": 1270,
        "PHONE_NUMBER": "79062195047",
        "CALL_DURATION": 95,
        "CALL_STATUS": 1,
        "CALL_FAILED_CODE": "200",
        "CRM_ACTIVITY_ID": 7943,
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": 797,
        "ID": 7
    }
}
```

Если запись прикреплена по `RECORD_URL`, метод `attachRecord` вернет идентификатор файла.

```json
{
    "result": {
        "FILE_ID": 9079
    }
}
```

## Зафиксируем звонок без показа карточки

Если связь между АТС и Битрикс24 была недоступна, после восстановления сохраните факт звонка без карточки: вызовите `register` с `SHOW = 0`, затем `finish` с фактическими данными. Сценарий не показывает звонок в реальном времени, но сохраняет историю, статистику и CRM-дело.

{% list tabs %}

- JS

    ```js
    const reg = await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.register',
        params: {
            USER_ID: 1269,
            PHONE_NUMBER: '79062195047',
            TYPE: 2,
            LINE_NUMBER: 'line-1',
            EXTERNAL_CALL_ID: 'asterisk-1773130778.18441-offline',
            SHOW: 0,
        },
        requestId: 'call-register',
    })
    const callId = reg.getData().result.CALL_ID

    await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.finish',
        params: { CALL_ID: callId, USER_ID: 1269, DURATION: 0, STATUS_CODE: '304' },
        requestId: 'call-finish',
    })
    ```

- PHP

    ```php
    $callId = $b24->core->call('telephony.externalCall.register', [
        'USER_ID' => 1269,
        'PHONE_NUMBER' => '79062195047',
        'TYPE' => 2,
        'LINE_NUMBER' => 'line-1',
        'EXTERNAL_CALL_ID' => 'asterisk-1773130778.18441-offline',
        'SHOW' => 0,
    ])->getResponseData()->getResult()['CALL_ID'];

    $b24->core->call('telephony.externalCall.finish', [
        'CALL_ID' => $callId, 'USER_ID' => 1269, 'DURATION' => 0, 'STATUS_CODE' => '304',
    ]);
    ```

- Python

    ```python
    call_id = client.telephony.external_call.register(
        phone_number="79062195047",
        call_type=2,
        user_id=1269,
        line_number="line-1",
        external_call_id="asterisk-1773130778.18441-offline",
        show=0,
    ).response.result["CALL_ID"]

    client.telephony.external_call.finish(
        call_id=call_id, user_id=1269, duration=0, status_code="304",
    ).response
    ```

{% endlist %}

## Проверим результат

Проверьте, что интеграция обработала звонок:

- во время входящего звонка у нужного сотрудника открылась карточка звонка
- после ответа оператора карточка скрылась у остальных сотрудников очереди
- после `finish` звонок появился в статистике телефонии
- в CRM создано дело звонка, если звонок связан с контактом, компанией, лидом или сделкой
- после `attachRecord` в деле звонка доступна запись разговора

Через REST успешность подтверждают поля ответа `finish`: `ID`, `CALL_STATUS`, `CALL_FAILED_CODE`, `CRM_ACTIVITY_ID`, `CRM_ENTITY_TYPE` и `CRM_ENTITY_ID`.

Выведите эти поля из ответа `finish`, который получили в шаге 6.

{% list tabs %}

- JS

    ```js
    const finishResult = finishResponse.getData().result

    console.table({
        ID: finishResult.ID,
        CALL_STATUS: finishResult.CALL_STATUS,
        CALL_FAILED_CODE: finishResult.CALL_FAILED_CODE,
        CRM_ACTIVITY_ID: finishResult.CRM_ACTIVITY_ID,
        CRM_ENTITY_TYPE: finishResult.CRM_ENTITY_TYPE,
        CRM_ENTITY_ID: finishResult.CRM_ENTITY_ID,
    })
    ```

- PHP

    ```php
    $finishResult = $finishResponse->getResponseData()->getResult();

    echo 'ID: ' . $finishResult['ID'] . PHP_EOL;
    echo 'CALL_STATUS: ' . $finishResult['CALL_STATUS'] . PHP_EOL;
    echo 'CALL_FAILED_CODE: ' . $finishResult['CALL_FAILED_CODE'] . PHP_EOL;
    echo 'CRM_ACTIVITY_ID: ' . $finishResult['CRM_ACTIVITY_ID'] . PHP_EOL;
    echo 'CRM_ENTITY_TYPE: ' . $finishResult['CRM_ENTITY_TYPE'] . PHP_EOL;
    echo 'CRM_ENTITY_ID: ' . $finishResult['CRM_ENTITY_ID'] . PHP_EOL;
    ```

- Python

    ```python
    finish_result = finish_response.result

    for field in [
        "ID",
        "CALL_STATUS",
        "CALL_FAILED_CODE",
        "CRM_ACTIVITY_ID",
        "CRM_ENTITY_TYPE",
        "CRM_ENTITY_ID",
    ]:
        print(field, finish_result.get(field))
    ```

{% endlist %}

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса и контекст авторизации.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `WRONG_AUTH_TYPE` | Метод вызван вне контекста приложения. Проверьте OAuth-авторизацию приложения и scope `telephony` ||
|| `USER_ID or USER_PHONE_INNER should be set` | В `register` или `finish` не передан сотрудник. Передайте активный `USER_ID` или внутренний номер сотрудника ||
|| `Unknown TYPE` | В `register` передан неверный тип звонка. Для входящего звонка используйте `TYPE = 2` ||
|| `Unsupported phone number format` | Номер клиента не распознан. Передавайте телефон в международном формате без букв ||
|| `Line already exists` | Линия с таким `NUMBER` уже зарегистрирована. Используйте существующий `LINE_NUMBER` или измените номер линии ||
|| `CALL_ID must be a string` | В `finish` передан неверный тип `CALL_ID`. Передавайте строку, полученную из ответа `register` или события `ONEXTERNALCALLSTART` ||
|| `Call is not found` | Звонок не найден или уже завершен. Проверьте, что `CALL_ID` сохранен из текущего звонка ||
|| `Call is not found in the statistic table. Looks like it is not finished yet.` | Запись прикрепляется до завершения звонка. Сначала вызовите `finish`, затем `attachRecord` ||
|| `Required parameters are not set. Request should contain or URL or FILENAME parameter` | В `attachRecord` не переданы `RECORD_URL` или `FILENAME` ||
|| `Wrong file extension. Only wav and mp3 are allowed` | Запись передана в неподдерживаемом формате. Используйте файл `wav` или `mp3` ||
|| `ERROR_EVENT_NOT_FOUND` | В `event.bind` неверно указано событие. Передайте `ONEXTERNALCALLSTART` ||
|#

Повторяйте сценарий с шага, на котором произошла ошибка. Если ошибка возникла после успешного `register`, используйте тот же `CALL_ID`, пока звонок не завершен.

## Что важно учитывать

- Для исходящих звонков из CRM нужен установленный обработчик `ONEXTERNALCALLSTART`. Входящий вебхук не получает это событие
- Передавайте уникальный `EXTERNAL_CALL_ID` для каждого физического звонка, чтобы повторный `register` не вернул уже существующий `CALL_ID`
- Храните OAuth-токены приложения на сервере, не добавляйте их в публичный клиентский код
- Обработчик события должен быть доступен из интернета по HTTPS и принимать POST-запросы от Битрикс24
- Запись разговора прикрепляйте после `finish`, когда звонок уже сохранен в статистике

## Продолжите изучение

- [Обзор методов телефонии](../../api-reference/telephony/index.md)
- [События телефонии](../../api-reference/telephony/events/index.md)
- [Вкладка в карточке звонка CALL_CARD](../../api-reference/widgets/telephony/call-card.md)
