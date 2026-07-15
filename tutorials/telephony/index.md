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

{% note info "" %}

REST-методы `telephony.externalCall.*` и `telephony.externalLine.*` работают как через входящий вебхук, так и в контексте приложения. Событие [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) (шаг 5) приходит только установленному приложению — его принимает ваш веб-сервер.

В PHP методы телефонии вызываются напрямую через ядро (`$b24->core->call(...)`). Типизированные аналоги есть в `getTelephonyScope()->externalCall()` (`show`, `hide`, `register`, `finishForUserId`) и `->externalLine()`, но они требуют объектов-значений (`CallType`, `TelephonyCallStatusCode`, `Money`, `CarbonImmutable`).

{% endnote %}

## Инициализация SDK

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/');
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import Client, BitrixWebhook

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="1/xxxxxxxxxxxxxxxx",
    ))
    ```

{% endlist %}

## 1. Соберем приложение

Рабочая интеграция обычно состоит из серверного приложения и обработчиков для АТС и Битрикс24:

1. Создайте [локальное приложение](../../settings/app-installation/local-apps/index.md) или приложение для Маркета
2. Завершите установку приложения и сохраните авторизацию
3. Зарегистрируйте внешнюю линию методом [telephony.externalLine.add](../../api-reference/telephony/telephony-external-line-add.md). Номер линии передавайте в `LINE_NUMBER` метода [telephony.externalCall.register](../../api-reference/telephony/telephony-external-call-register.md)
4. Подпишите приложение на [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) методом [event.bind](../../api-reference/events/event-bind.md), если нужно запускать исходящие звонки из CRM
5. Создайте обработчик событий от АТС, который вызывает `telephony.externalCall.register/show/hide/finish` по состоянию звонка
6. Создайте обработчик [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) для исходящих звонков
7. Если запись разговора появляется после завершения, прикрепите ее методом [telephony.externalCall.attachRecord](../../api-reference/telephony/telephony-external-call-attach-record.md)

Регистрация внешней линии:

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

**Последовательная очередь.** Покажите карточку первому сотруднику методом `show`. Если он не ответил за заданное в АТС время, скройте карточку методом `hide` и покажите следующему сотруднику методом `show`.

## 4. Направим звонок ответственному за клиента

Чтобы показать звонок ответственному менеджеру, зарегистрируйте звонок с `SHOW = 0`. Битрикс24 найдет объект CRM по номеру и вернет `CRM_ENTITY_TYPE` и `CRM_ENTITY_ID`. По объекту получите ответственного и передайте его в `telephony.externalCall.show`.

{% list tabs %}

- JS

    ```js
    const reg = await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.register',
        params: { PHONE_NUMBER: '79062195047', TYPE: 2, LINE_NUMBER: 'line-1', SHOW: 0 },
        requestId: 'call-register',
    })
    const { CALL_ID, CRM_ENTITY_TYPE, CRM_ENTITY_ID } = reg.getData().result

    let assignedById
    if (CRM_ENTITY_TYPE === 'CONTACT' && CRM_ENTITY_ID) {
        const contact = await $b24.actions.v2.call.make({
            method: 'crm.contact.get', params: { id: CRM_ENTITY_ID }, requestId: 'contact-get',
        })
        assignedById = contact.getData().result.ASSIGNED_BY_ID
    }

    if (assignedById) {
        await $b24.actions.v2.call.make({
            method: 'telephony.externalCall.show',
            params: { CALL_ID, USER_ID: assignedById },
            requestId: 'call-show',
        })
    }
    ```

- PHP

    ```php
    $reg = $b24->core->call('telephony.externalCall.register', [
        'PHONE_NUMBER' => '79062195047', 'TYPE' => 2, 'LINE_NUMBER' => 'line-1', 'SHOW' => 0,
    ])->getResponseData()->getResult();

    $assignedById = null;
    if (($reg['CRM_ENTITY_TYPE'] ?? '') === 'CONTACT' && !empty($reg['CRM_ENTITY_ID'])) {
        $contact = $b24->getCRMScope()->contact()->get((int)$reg['CRM_ENTITY_ID'])->contact();
        $assignedById = $contact->ASSIGNED_BY_ID;
    }

    if ($assignedById) {
        $b24->core->call('telephony.externalCall.show', [
            'CALL_ID' => $reg['CALL_ID'],
            'USER_ID' => [$assignedById],
        ]);
    }
    ```

- Python

    ```python
    reg = client.telephony.external_call.register(
        phone_number="79062195047", call_type=2, line_number="line-1", show=0,
    ).response.result

    assigned_by_id = None
    if reg.get("CRM_ENTITY_TYPE") == "CONTACT" and reg.get("CRM_ENTITY_ID"):
        contact = client.crm.contact.get(bitrix_id=reg["CRM_ENTITY_ID"]).response.result
        assigned_by_id = contact["ASSIGNED_BY_ID"]

    if assigned_by_id:
        client.telephony.external_call.show(call_id=reg["CALL_ID"], user_id=assigned_by_id).response
    ```

{% endlist %}

Чтобы найти клиента по телефону без регистрации звонка, используйте [telephony.externalCall.searchCrmEntities](../../api-reference/telephony/telephony-external-call-search-crm-entities.md).

## 5. Обработаем исходящий звонок из CRM

Когда сотрудник нажимает на номер в CRM, Битрикс24 регистрирует звонок и отправляет приложению событие [ONEXTERNALCALLSTART](../../api-reference/telephony/events/on-external-call-start.md) с полями `CALL_ID`, `PHONE_NUMBER`, `USER_ID`, `LINE_NUMBER`, `CRM_ENTITY_TYPE`, `CRM_ENTITY_ID`, `CALL_LIST_ID`.

Событие принимает ваш веб-сервер (SDK выполняет только исходящие вызовы). После запуска вызова на АТС завершите тот же `CALL_ID` методом `finish`.

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

## 6. Завершим звонок и сохраним результат

После разговора вызовите [telephony.externalCall.finish](../../api-reference/telephony/telephony-external-call-finish.md): метод скрывает карточку, сохраняет звонок в статистике и создает CRM-дело. Передайте `CALL_ID`, `USER_ID`, `DURATION` (сек) и `STATUS_CODE` (`200` — успешно, `304` — пропущенный).

Если запись еще не готова, вызовите `finish` без записи, а позже прикрепите ее методом [telephony.externalCall.attachRecord](../../api-reference/telephony/telephony-external-call-attach-record.md). После записи можно добавить расшифровку методом [telephony.call.attachTranscription](../../api-reference/telephony/telephony-call-attach-transcription.md).

{% list tabs %}

- JS

    ```js
    await $b24.actions.v2.call.make({
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
    $b24->core->call('telephony.externalCall.finish', [
        'CALL_ID' => $callId, 'USER_ID' => 1270, 'DURATION' => 95, 'STATUS_CODE' => '200', 'ADD_TO_CHAT' => 1,
    ]);

    // позже, когда запись готова
    $b24->core->call('telephony.externalCall.attachRecord', [
        'CALL_ID' => $callId, 'FILENAME' => 'record.mp3', 'RECORD_URL' => 'https://your-domain.example/record.mp3',
    ]);
    ```

- Python

    ```python
    client.telephony.external_call.finish(
        call_id=call_id, user_id=1270, duration=95, status_code="200", add_to_chat=1,
    ).response

    # позже, когда запись готова
    client.telephony.external_call.attach_record(
        call_id=call_id, filename="record.mp3", record_url="https://your-domain.example/record.mp3",
    ).response
    ```

{% endlist %}

## Зафиксируем звонок без показа карточки

Если связь между АТС и Битрикс24 была недоступна, после восстановления сохраните факт звонка без карточки: вызовите `register` с `SHOW = 0`, затем `finish` с фактическими данными. Сценарий не показывает звонок в реальном времени, но сохраняет историю, статистику и CRM-дело.

{% list tabs %}

- JS

    ```js
    const reg = await $b24.actions.v2.call.make({
        method: 'telephony.externalCall.register',
        params: { USER_ID: 1269, PHONE_NUMBER: '79062195047', TYPE: 2, LINE_NUMBER: 'line-1', SHOW: 0 },
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
        'USER_ID' => 1269, 'PHONE_NUMBER' => '79062195047', 'TYPE' => 2, 'LINE_NUMBER' => 'line-1', 'SHOW' => 0,
    ])->getResponseData()->getResult()['CALL_ID'];

    $b24->core->call('telephony.externalCall.finish', [
        'CALL_ID' => $callId, 'USER_ID' => 1269, 'DURATION' => 0, 'STATUS_CODE' => '304',
    ]);
    ```

- Python

    ```python
    call_id = client.telephony.external_call.register(
        phone_number="79062195047", call_type=2, user_id=1269, line_number="line-1", show=0,
    ).response.result["CALL_ID"]

    client.telephony.external_call.finish(
        call_id=call_id, user_id=1269, duration=0, status_code="304",
    ).response
    ```

{% endlist %}

## Продолжите изучение

- [Обзор методов телефонии](../../api-reference/telephony/index.md)
- [События телефонии](../../api-reference/telephony/events/index.md)
- [Вкладка в карточке звонка CALL_CARD](../../api-reference/widgets/telephony/index.md)
