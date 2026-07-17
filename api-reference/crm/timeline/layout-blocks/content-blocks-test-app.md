# Пример приложения с дополнительными контентными блоками

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Дополнительный контентный блок — это часть интерфейса, которую приложение добавляет к делу или записи таймлайна. В блоке можно показать текст, ссылку, заголовок, срок и другие данные приложения. Пользователь увидит блок в таймлайне карточки CRM.

Пример работает как тестовая страница: с его помощью можно проверить структуру блоков перед использованием в своем приложении.

## Как работает сценарий

В сценарии участвуют пользователь, приложение и Битрикс24:

- пользователь выбирает элемент CRM, дело или запись таймлайна и собирает набор блоков
- приложение вызывает методы и передает выбранные идентификаторы, а при установке — еще и JSON с блоками
- Битрикс24 сохраняет набор этого приложения и показывает его в таймлайне карточки CRM

Элемент CRM — это конкретная карточка лида, сделки, контакта, компании, предложения, счета или смарт-процесса. Для запросов нужны два значения:

- `entityTypeId` — числовой код типа объекта CRM, например `2` для сделки
- `entityId` — идентификатор конкретного элемента, например идентификатор сделки

Блоки можно добавить в два места:

- **дело** — действие в таймлайне, например звонок или письмо. Приложение загружает связанные дела методом [crm.activity.list](../activities/activity-base/crm-activity-list.md) и использует поле `ID` выбранного дела как `activityId`
- **запись таймлайна** — отдельное событие в истории элемента CRM. Публичного метода для поиска подходящих записей нет. Для проверки создайте комментарий в том же элементе CRM методом [crm.timeline.comment.add](../comments/crm-timeline-comment-add.md). Метод вернет его идентификатор в поле `result`. Передайте это значение как [timelineId](./crm-timeline-layout-blocks-set.md)

После выбора места приложение выполняет три операции:

1. Получает установленный им набор методом [crm.activity.layout.blocks.get](../activities/layout-blocks/crm-activity-layout-blocks-get.md) или [crm.timeline.layout.blocks.get](./crm-timeline-layout-blocks-get.md)
2. Устанавливает новый набор методом [crm.activity.layout.blocks.set](../activities/layout-blocks/crm-activity-layout-blocks-set.md) или [crm.timeline.layout.blocks.set](./crm-timeline-layout-blocks-set.md)
3. Удаляет набор методом [crm.activity.layout.blocks.delete](../activities/layout-blocks/crm-activity-layout-blocks-delete.md) или [crm.timeline.layout.blocks.delete](./crm-timeline-layout-blocks-delete.md)

## Подготавливаем приложение и данные

1. Сохраните [полный код](#full-code) в файл `index.html`
2. В трех пресетах со ссылками замените `123` в пути `/crm/deal/details/123/` на идентификатор существующей сделки или укажите другой относительный путь внутри Битрикс24
3. Разместите файл на сервере с публичным HTTPS-адресом
4. Создайте [серверное локальное приложение с пользовательским интерфейсом](../../../../local-integrations/serverside-local-app-with-ui.md), укажите адрес файла как основную страницу и добавьте scope [`crm`](../../../scopes/permissions.md)
5. Установите и откройте приложение в Битрикс24

Для проверки подготовьте:

- элемент CRM, к которому у пользователя есть доступ на чтение и изменение
- дело в выбранном элементе CRM для проверки первого режима
- сделку, в которой можно создать тестовый комментарий для проверки второго режима
- доступ из браузера к CDN jsDelivr и адресу `api.bitrix24.tech`

[Методы дополнительных блоков дел](../activities/layout-blocks/index.md) и [методы дополнительных блоков таймлайна](./index.md) работают только в контексте установленного приложения. Входящий вебхук для примера не подходит.

Приложение дополняет список типов CRM методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Метод требует административного доступа к CRM. Если прав недостаточно, приложение покажет ошибку, но сохранит в списке стандартные типы: лиды, сделки, контакты, компании, предложения и счета.

### Получаем `timelineId` для сделки

Этот шаг нужен только для режима **Запись таймлайна**. Откройте установленное приложение и дождитесь его загрузки. Затем откройте инструменты разработчика, на вкладке **Console** выберите контекст iframe приложения и выполните следующий код.

В примере `ENTITY_ID = 4` — идентификатор сделки, который нужно заменить. Строковый тип `deal` соответствует числовому `entityTypeId = 2` в тестовом приложении.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

```js
BX24.callMethod(
    'crm.timeline.comment.add',
    {
        fields: {
            ENTITY_TYPE: 'deal',
            ENTITY_ID: 4,
            COMMENT: 'Комментарий для проверки контентных блоков',
        },
    },
    (result) => {
        if (result.error())
        {
            console.error(result.error());
            return;
        }

        const timelineId = result.data();
        console.log('timelineId:', timelineId);
    }
);
```

Метод [crm.timeline.comment.add](../comments/crm-timeline-comment-add.md) вернет целочисленный идентификатор комментария. В консоли появится строка, например `timelineId: 123`. Сохраните значение: оно понадобится при проверке режима записи таймлайна.

Каждый запуск запроса создает новый комментарий. После проверки ненужный комментарий можно удалить методом [crm.timeline.comment.delete](../comments/crm-timeline-comment-delete.md).

Дальше разберем основные части приложения. Фрагменты показывают, как связаны интерфейс, параметры и методы, но не запускаются отдельно. В [полном коде](#full-code) они уже собраны в правильном порядке.

Основная логика находится в классе `ConfigurableTimelineBlocks`. Он хранит редактор, поля и кнопки. Записи вида `this.#itemIdNode` обращаются к приватным полям класса. Методы из следующих шагов относятся к этому классу.

## 1. Подключаем библиотеки

В начале файла зададим кодировку UTF-8 и подключим три внешних ресурса:

- Bootstrap оформляет поля и кнопки
- JSONEditor показывает и редактирует объект `layout` как JSON
- [BX24.js](../../../../sdk/bx24-js-sdk/index.md) предоставляет функции для инициализации страницы и вызова методов Битрикс24

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Дополнительные контентные блоки</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/jsoneditor@9.9.2/dist/jsoneditor.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/jsoneditor@9.9.2/dist/jsoneditor.min.js"></script>
    <script src="https://api.bitrix24.tech/api/v1/"></script>
</head>
```

Без JSONEditor страница не сможет показать редактор блоков. Без BX24.js не будут доступны [BX24.init](../../../../sdk/bx24-js-sdk/system-functions/bx24-init.md) и [BX24.callMethod](../../../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.md).

## 2. Добавляем интерфейс

Разделим страницу на две части. Слева будет редактор JSON, справа — параметры запросов.

```html
<body>
    <div class="container-fluid">
        <form id="form" class="mt-3 mb-3">
            <div class="row">
                <div class="col-8">
                    <div class="mb-3">
                        <div class="d-flex flex-row gap-3">
                            <label class="form-label h3">JSON блоков</label>
                            <div id="content_block_presets" class="d-flex flex-row gap-2"></div>
                        </div>
                        <div id="json_editor" style="height: 510px"></div>
                    </div>
                </div>
                <div class="col-4" id="parameters">
                    <label class="form-label h3">Параметры</label>
                    <hr class="mt-0">
                    <div class="vstack gap-3">
                        <div class="form-group">
                            <label for="entity_type_id">Объект CRM</label>
                            <select id="entity_type_id" name="entityTypeId" class="form-select">
                                <option value="2" selected>[2] Сделка</option>
                                <option value="1">[1] Лид</option>
                                <option value="3">[3] Контакт</option>
                                <option value="4">[4] Компания</option>
                                <option value="7">[7] Предложение</option>
                                <option value="31">[31] Счет</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="entity_id">Идентификатор объекта CRM</label>
                            <input id="entity_id" name="entityId" type="number" min="1" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="item_type_id" class="text-truncate">Куда добавить блоки</label>
                            <select name="itemTypeId" id="item_type_id" class="form-select" required>
                                <option value="1" selected>Дело</option>
                                <option value="2">Запись таймлайна</option>
                            </select>
                        </div>
                        <button id="get_items_button" type="button" class="btn btn-outline-dark btn-sm">Найти</button>
                        <div class="form-group">
                            <label id="item_id_label" for="item_id">Дело</label>
                            <select name="itemId" id="item_id" class="form-select"></select>
                        </div>
                        <button id="get_button" type="button" class="btn btn-outline-dark btn-sm">Получить</button>
                        <button id="set_button" type="button" class="btn btn-outline-dark btn-sm">Установить</button>
                        <button id="delete_button" type="button" class="btn btn-outline-danger btn-sm">Удалить</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="container-fluid" id="alert_container"></div>
```

По умолчанию выбран тип **Сделка** с `entityTypeId = 2` и режим **Дело**. Пользователь вводит `entityId` — идентификатор конкретной сделки — и нажимает **Найти**. Для записи таймлайна приложение заменит список дел на поле ручного ввода `timelineId`.

## 3. Выбираем методы для дела или записи таймлайна

У двух режимов одинаковые операции, но разные имена методов и параметры идентификатора. Объект `METHODS_MAP` хранит это соответствие в одном месте.

```js
    const ITEM_ACTIVITY = 1;
    const ITEM_TIMELINE = 2;
    const ALLOWED_ITEM_TYPES = [
        ITEM_ACTIVITY,
        ITEM_TIMELINE,
    ];
    const METHODS_MAP = {
        [ITEM_ACTIVITY]: {
            get: 'crm.activity.layout.blocks.get',
            set: 'crm.activity.layout.blocks.set',
            delete: 'crm.activity.layout.blocks.delete',
            itemField: 'activityId',
        },
        [ITEM_TIMELINE]: {
            get: 'crm.timeline.layout.blocks.get',
            set: 'crm.timeline.layout.blocks.set',
            delete: 'crm.timeline.layout.blocks.delete',
            itemField: 'timelineId',
        },
    };
```

Например, для дела приложение выберет метод [crm.activity.layout.blocks.set](../activities/layout-blocks/crm-activity-layout-blocks-set.md) и передаст идентификатор в параметре `activityId`. Для записи таймлайна оно выберет [crm.timeline.layout.blocks.set](./crm-timeline-layout-blocks-set.md) и параметр `timelineId`.

При смене режима метод `renderItemIdControl` меняет элемент интерфейса:

```js
        renderItemIdControl()
        {
            const isActivity = this.getItemTypeId() === ITEM_ACTIVITY;
            const itemIdNode = document.createElement(isActivity ? 'select' : 'input');
            itemIdNode.id = 'item_id';
            itemIdNode.name = 'itemId';
            itemIdNode.className = isActivity ? 'form-select' : 'form-control';
            if (!isActivity)
            {
                itemIdNode.type = 'number';
                itemIdNode.min = '1';
            }
            this.#itemIdNode.replaceWith(itemIdNode);
            this.#itemIdNode = itemIdNode;
            this.#getItemsButton.hidden = !isActivity;
            document.getElementById('item_id_label').textContent = isActivity
                ? 'Дело'
                : 'Идентификатор записи таймлайна';
        }
```

Для дела отображаются список и кнопка **Найти**, для записи таймлайна — числовое поле ручного ввода.

## 4. Загружаем типы CRM и дела

При открытии страницы метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) дополняет список объектов CRM смарт-процессами. Функция [BX24.callMethod](../../../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.md) передает объект `result` в callback — функцию, которая запускается после ответа. [`result.error()`](../../../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.md#ajax-result) возвращает ошибку, а [`result.data()`](../../../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.md#ajax-result) — данные успешного ответа.

```js
        loadDynamicTypes()
        {
            BX24.callMethod('crm.type.list', {}, (result) => {
                if (result.error())
                {
                    this.renderRequestError(result, 'Не удалось загрузить смарт-процессы');
                    return;
                }
                const types = result.data()?.types ?? [];
                types.forEach((item) => {
                    const option = document.createElement('option');
                    option.value = item.entityTypeId;
                    option.innerText = `[${item.entityTypeId}] ${item.title}`;
                    this.#entityTypeIdNode.append(option);
                });
            });
        }
```

Значение `item.entityTypeId` становится `value` нового пункта. Именно этот код приложение передаст в параметре `entityTypeId` следующих запросов.

После нажатия **Найти** метод [crm.activity.list](../activities/activity-base/crm-activity-list.md) получает дела, связанные с выбранным элементом CRM. Перед запросом функция `loading()` блокирует поля и кнопки, а `stopLoading()` включает их после ответа.

```js
        getItemsAction()
        {
            if (this.getItemTypeId() !== ITEM_ACTIVITY)
            {
                return;
            }
            if (!this.validateEntityTypeIdAndEntityId())
            {
                return;
            }
            const data = {
                select: ['*'],
                filter: {
                    'OWNER_TYPE_ID': this.getEntityTypeId(),
                    'OWNER_ID': this.getEntityId(),
                },
            };
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderRequestError(result);
                    return;
                }
                const activities = result.data();
                this.#itemIdNode.innerHTML = '';
                activities.forEach((activity) => {
                    const option = document.createElement('option');
                    option.innerText = `[${activity.ID}] ${activity.SUBJECT} | ${activity.PROVIDER_ID}`;
                    option.value = activity.ID;
                    this.#itemIdNode.append(option);
                });
            };
            this.loading();
            BX24.callMethod('crm.activity.list', data, callback);
        }
```

В фильтре `OWNER_TYPE_ID` — код типа объекта, а `OWNER_ID` — идентификатор конкретного элемента. Из каждого найденного дела приложение сохраняет поле `ID`: дальше оно станет параметром `activityId`.

## 5. Проверяем и собираем параметры

Перед каждым запросом приложение проверяет идентификатор элемента CRM и выбранного дела или записи. Значения должны быть целыми положительными числами.

```js
        validateFieldsWithAlerts()
        {
            if (!this.validateEntityTypeIdAndEntityId())
            {
                return false;
            }
            const itemId = this.getItemId();
            if (!Number.isInteger(itemId) || itemId < 1)
            {
                alert(this.getItemTypeId() === ITEM_ACTIVITY
                    ? 'Выберите дело'
                    : 'Введите идентификатор записи таймлайна');
                this.#itemIdNode.focus();
                return false;
            }
            return true;
        }
        validateEntityTypeIdAndEntityId()
        {
            const entityId = this.getEntityId();
            if (!Number.isInteger(entityId) || entityId < 1)
            {
                alert('Введите идентификатор объекта CRM');
                this.#entityIdNode.focus();
                return false;
            }
            if (!ALLOWED_ITEM_TYPES.includes(this.getItemTypeId()))
            {
                alert('Выберите, куда добавить блоки');
                this.#itemTypeIdNode.focus();
                return false;
            }
            return true;
        }
```

Метод `getData` собирает общую часть параметров. Вычисляемое имя поля в квадратных скобках подставит `activityId` или `timelineId` из `METHODS_MAP`.

```js
        getData()
        {
            return {
                entityTypeId: this.getEntityTypeId(),
                entityId: this.getEntityId(),
                [this.getItemFieldName()]: this.getItemId(),
            };
        }
        getMethod(method)
        {
            return METHODS_MAP[this.getItemTypeId()][method];
        }
```

Для сделки с `entityId = 4` и дела с `ID = 8` получится объект `{ entityTypeId: 2, entityId: 4, activityId: 8 }`.

## 6. Получаем установленный набор

Кнопка **Получить** вызывает метод `get` выбранной группы.

```js
        getAction()
        {
            const isValid = this.validateFieldsWithAlerts();
            if (!isValid)
            {
                return;
            }
            const method = this.getMethod('get');
            const data = this.getData();
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderRequestError(result);
                    return;
                }
                this.#jsonEditor.set(result.data().layout ?? {});
                this.renderSuccessAlert('Набор блоков получен');
            };
            this.loading();
            BX24.callMethod(method, data, callback);
        }
```

В успешном ответе [`result.data()`](../../../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.md#ajax-result) возвращает объект с полем `layout`. Приложение передает его значение в редактор JSON, а при отсутствии `layout` — пустой объект.

## 7. Устанавливаем и удаляем набор

Массив `presets` хранит названия кнопок и готовые блоки. Метод `renderJSONLayoutActions` создает кнопки и добавляет выбранный блок в первый свободный числовой ключ объекта `blocks`. Существующие блоки при этом не перезаписываются.

Объект `layout` должен соответствовать структуре [RestAppLayoutDto](../activities/configurable/structure/rest-app-layout-dto.md) и содержать от 1 до 20 блоков.

Например, набор с одним текстовым блоком выглядит так:

```json
{
  "blocks": {
    "1": {
      "type": "text",
      "properties": {
        "value": "Здравствуйте!",
        "multiline": true
      }
    }
  }
}
```

Кнопка **Установить** читает JSON, проверяет поле `blocks` и количество блоков, затем добавляет `layout` к параметрам метода `set`.

```js
        setAction()
        {
            const isValid = this.validateFieldsWithAlerts();
            if (!isValid)
            {
                return;
            }
            let layout;
            try
            {
                layout = this.#jsonEditor.get();
            }
            catch
            {
                this.renderDangerAlert('Исправьте ошибки в JSON');
                return;
            }
            if (!layout || typeof layout !== 'object' || Array.isArray(layout))
            {
                this.renderDangerAlert('Корневое значение JSON должно быть объектом');
                return;
            }
            if (!layout.blocks || typeof layout.blocks !== 'object' || Array.isArray(layout.blocks))
            {
                this.renderDangerAlert('Поле blocks должно быть объектом');
                return;
            }
            const blocksCount = Object.keys(layout.blocks).length;
            if (blocksCount < 1 || blocksCount > 20)
            {
                this.renderDangerAlert('Количество блоков должно быть от 1 до 20');
                return;
            }
            const method = this.getMethod('set');
            const data = {
                ...this.getData(),
                layout,
            };
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderRequestError(result);
                    return;
                }
                this.renderSuccessAlert('Набор блоков установлен');
            };
            this.loading();
            BX24.callMethod(method, data, callback);
        }
```

Повторный вызов заменит предыдущий набор этого же приложения. Наборы других приложений не изменятся.

Кнопка **Удалить** вызывает метод `delete` с теми же идентификаторами. После успешного ответа приложение очищает редактор.

```js
        deleteAction()
        {
            const isValid = this.validateFieldsWithAlerts();
            if (!isValid)
            {
                return;
            }
            const method = this.getMethod('delete');
            const data = this.getData();
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderRequestError(result);
                    return;
                }
                this.renderSuccessAlert('Набор блоков удален');
                this.#jsonEditor.set({});
            };
            this.loading();
            BX24.callMethod(method, data, callback);
        }
```

## 8. Обрабатываем ошибки и запускаем приложение

Каждый обработчик проверяет [`result.error()`](../../../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.md#ajax-result). Функция `renderRequestError` пытается получить описание ошибки и показывает его под формой.

```js
        renderRequestError(result, prefix = 'Ошибка запроса')
        {
            const error = result.error();
            const description = error?.ex?.error_description
                ?? error?.ex?.error
                ?? error?.status
                ?? 'Неизвестная ошибка';
            this.renderDangerAlert(`${prefix}: ${description}`);
        }
```

После загрузки HTML дождемся готовности BX24.js через [BX24.init](../../../../sdk/bx24-js-sdk/system-functions/bx24-init.md). Затем создадим JSONEditor и экземпляр класса приложения.

```js
    document.addEventListener('DOMContentLoaded', () => {
        BX24.init(() => {
            const alertContainer = document.getElementById('alert_container');
            const jsonEditor = new JSONEditor(document.getElementById('json_editor'), {
                mode: 'code',
            });
            new ConfigurableTimelineBlocks(
                jsonEditor,
                alertContainer,
                presets,
            );
        });
    });
```

Конструктор класса связывает кнопки с обработчиками, создает кнопки готовых блоков и загружает смарт-процессы. После этого приложение готово принимать действия пользователя.

## Полный код приложения {#full-code}

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Дополнительные контентные блоки</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/jsoneditor@9.9.2/dist/jsoneditor.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/jsoneditor@9.9.2/dist/jsoneditor.min.js"></script>
    <script src="https://api.bitrix24.tech/api/v1/"></script>
</head>
<body>
    <div class="container-fluid">
        <form id="form" class="mt-3 mb-3">
            <div class="row">
                <div class="col-8">
                    <div class="mb-3">
                        <div class="d-flex flex-row gap-3">
                            <label class="form-label h3">JSON блоков</label>
                            <div id="content_block_presets" class="d-flex flex-row gap-2"></div>
                        </div>
                        <div id="json_editor" style="height: 510px"></div>
                    </div>
                </div>
                <div class="col-4" id="parameters">
                    <label class="form-label h3">Параметры</label>
                    <hr class="mt-0">
                    <div class="vstack gap-3">
                        <div class="form-group">
                            <label for="entity_type_id">Объект CRM</label>
                            <select id="entity_type_id" name="entityTypeId" class="form-select">
                                <option value="2" selected>[2] Сделка</option>
                                <option value="1">[1] Лид</option>
                                <option value="3">[3] Контакт</option>
                                <option value="4">[4] Компания</option>
                                <option value="7">[7] Предложение</option>
                                <option value="31">[31] Счет</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="entity_id">Идентификатор объекта CRM</label>
                            <input id="entity_id" name="entityId" type="number" min="1" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="item_type_id" class="text-truncate">Куда добавить блоки</label>
                            <select name="itemTypeId" id="item_type_id" class="form-select" required>
                                <option value="1" selected>Дело</option>
                                <option value="2">Запись таймлайна</option>
                            </select>
                        </div>
                        <button id="get_items_button" type="button" class="btn btn-outline-dark btn-sm">Найти</button>
                        <div class="form-group">
                            <label id="item_id_label" for="item_id">Дело</label>
                            <select name="itemId" id="item_id" class="form-select"></select>
                        </div>
                        <button id="get_button" type="button" class="btn btn-outline-dark btn-sm">Получить</button>
                        <button id="set_button" type="button" class="btn btn-outline-dark btn-sm">Установить</button>
                        <button id="delete_button" type="button" class="btn btn-outline-danger btn-sm">Удалить</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="container-fluid" id="alert_container"></div>
<script>
    const ITEM_ACTIVITY = 1;
    const ITEM_TIMELINE = 2;
    const ALLOWED_ITEM_TYPES = [
        ITEM_ACTIVITY,
        ITEM_TIMELINE,
    ];
    const METHODS_MAP = {
        [ITEM_ACTIVITY]: {
            get: 'crm.activity.layout.blocks.get',
            set: 'crm.activity.layout.blocks.set',
            delete: 'crm.activity.layout.blocks.delete',
            itemField: 'activityId',
        },
        [ITEM_TIMELINE]: {
            get: 'crm.timeline.layout.blocks.get',
            set: 'crm.timeline.layout.blocks.set',
            delete: 'crm.timeline.layout.blocks.delete',
            itemField: 'timelineId',
        },
    };
    class ConfigurableTimelineBlocks {
        #jsonEditor;
        #statusContainer;
        #contentBlockPresets;
        // fields
        #entityTypeIdNode;
        #entityIdNode;
        #itemTypeIdNode;
        #itemIdNode;
        // buttons
        #getButton;
        #setButton;
        #deleteButton;
        #getItemsButton;
        constructor(
            jsonEditor,
            statusContainer,
            contentBlockPresets,
        ) {
            this.#jsonEditor = jsonEditor;
            this.#statusContainer = statusContainer;
            this.#contentBlockPresets = contentBlockPresets;
            this.renderJSONLayoutActions();
            this.fetchProperties();
            this.bindEvents();
            this.loadDynamicTypes();
        }
        fetchProperties() {
            this.#entityTypeIdNode = document.getElementById('entity_type_id');
            this.#entityIdNode = document.getElementById('entity_id');
            this.#itemTypeIdNode = document.getElementById('item_type_id');
            this.#itemIdNode = document.getElementById('item_id');
            this.#getButton = document.getElementById('get_button');
            this.#setButton = document.getElementById('set_button');
            this.#deleteButton = document.getElementById('delete_button');
            this.#getItemsButton = document.getElementById('get_items_button');
        }
        bindEvents() {
            this.#getButton.onclick = this.getAction.bind(this);
            this.#setButton.onclick = this.setAction.bind(this);
            this.#deleteButton.onclick = this.deleteAction.bind(this);
            this.#getItemsButton.onclick = this.getItemsAction.bind(this);
            this.#itemTypeIdNode.onchange = this.renderItemIdControl.bind(this);
        }
        renderItemIdControl()
        {
            const isActivity = this.getItemTypeId() === ITEM_ACTIVITY;
            const itemIdNode = document.createElement(isActivity ? 'select' : 'input');
            itemIdNode.id = 'item_id';
            itemIdNode.name = 'itemId';
            itemIdNode.className = isActivity ? 'form-select' : 'form-control';
            if (!isActivity)
            {
                itemIdNode.type = 'number';
                itemIdNode.min = '1';
            }
            this.#itemIdNode.replaceWith(itemIdNode);
            this.#itemIdNode = itemIdNode;
            this.#getItemsButton.hidden = !isActivity;
            document.getElementById('item_id_label').textContent = isActivity
                ? 'Дело'
                : 'Идентификатор записи таймлайна';
        }
        renderJSONLayoutActions() {
            const contentBlockPresetsContainer = document.getElementById('content_block_presets');
            if (!contentBlockPresetsContainer) {
                return;
            }
            contentBlockPresetsContainer.innerHTML = '';
            this.#contentBlockPresets.forEach((contentBlockPreset) => {
                const button = document.createElement('button');
                button.classList = 'btn btn-link btn-sm text-secondary';
                button.innerText = contentBlockPreset.getTitle();
                button.type = 'button';
                button.onclick = () => {
                    let json;
                    try
                    {
                        json = this.#jsonEditor.get();
                    }
                    catch
                    {
                        this.renderDangerAlert('Исправьте ошибки в JSON');
                        return false;
                    }
                    if (!json || typeof json !== 'object' || Array.isArray(json))
                    {
                        this.renderDangerAlert('Корневое значение JSON должно быть объектом');
                        return false;
                    }
                    if (!json.blocks) {
                        json.blocks = {};
                    }
                    if (typeof json.blocks !== 'object' || Array.isArray(json.blocks))
                    {
                        this.renderDangerAlert('Поле blocks должно быть объектом');
                        return false;
                    }
                    let blockId = 1;
                    while (Object.hasOwn(json.blocks, `${blockId}`))
                    {
                        blockId += 1;
                    }
                    json.blocks[`${blockId}`] = contentBlockPreset.getValue();
                    this.#jsonEditor.set(json);
                    return false;
                };
                contentBlockPresetsContainer.append(button);
            });
            const clearButton = document.createElement('button');
            clearButton.innerText = 'Очистить';
            clearButton.classList = 'btn btn-link btn-sm text-danger';
            clearButton.type = 'button';
            clearButton.onclick = () => {
                this.#jsonEditor.set({});
            };
            contentBlockPresetsContainer.append(clearButton);
        }
        loadDynamicTypes()
        {
            BX24.callMethod('crm.type.list', {}, (result) => {
                if (result.error())
                {
                    this.renderRequestError(result, 'Не удалось загрузить смарт-процессы');
                    return;
                }
                const types = result.data()?.types ?? [];
                types.forEach((item) => {
                    const option = document.createElement('option');
                    option.value = item.entityTypeId;
                    option.innerText = `[${item.entityTypeId}] ${item.title}`;
                    this.#entityTypeIdNode.append(option);
                });
            });
        }
        loading()
        {
            this.#entityTypeIdNode.disabled = true;
            this.#entityIdNode.disabled = true;
            this.#itemTypeIdNode.disabled = true;
            this.#itemIdNode.disabled = true;
            this.#getItemsButton.disabled = true;
            this.#getButton.disabled = true;
            this.#setButton.disabled = true;
            this.#deleteButton.disabled = true;
        }
        stopLoading()
        {
            this.#entityTypeIdNode.disabled = false;
            this.#entityIdNode.disabled = false;
            this.#itemTypeIdNode.disabled = false;
            this.#itemIdNode.disabled = false;
            this.#getItemsButton.disabled = false;
            this.#getButton.disabled = false;
            this.#setButton.disabled = false;
            this.#deleteButton.disabled = false;
        }
        getItemsAction()
        {
            if (this.getItemTypeId() !== ITEM_ACTIVITY)
            {
                return;
            }
            if (!this.validateEntityTypeIdAndEntityId())
            {
                return;
            }
            const data = {
                select: ['*'],
                filter: {
                    'OWNER_TYPE_ID': this.getEntityTypeId(),
                    'OWNER_ID': this.getEntityId(),
                },
            };
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderRequestError(result);
                    return;
                }
                const activities = result.data();
                this.#itemIdNode.innerHTML = '';
                activities.forEach((activity) => {
                    const option = document.createElement('option');
                    option.innerText = `[${activity.ID}] ${activity.SUBJECT} | ${activity.PROVIDER_ID}`;
                    option.value = activity.ID;
                    this.#itemIdNode.append(option);
                });
            };
            this.loading();
            BX24.callMethod('crm.activity.list', data, callback);
        }
        getAction()
        {
            const isValid = this.validateFieldsWithAlerts();
            if (!isValid)
            {
                return;
            }
            const method = this.getMethod('get');
            const data = this.getData();
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderRequestError(result);
                    return;
                }
                this.#jsonEditor.set(result.data().layout ?? {});
                this.renderSuccessAlert('Набор блоков получен');
            };
            this.loading();
            BX24.callMethod(method, data, callback);
        }
        setAction()
        {
            const isValid = this.validateFieldsWithAlerts();
            if (!isValid)
            {
                return;
            }
            let layout;
            try
            {
                layout = this.#jsonEditor.get();
            }
            catch
            {
                this.renderDangerAlert('Исправьте ошибки в JSON');
                return;
            }
            if (!layout || typeof layout !== 'object' || Array.isArray(layout))
            {
                this.renderDangerAlert('Корневое значение JSON должно быть объектом');
                return;
            }
            if (!layout.blocks || typeof layout.blocks !== 'object' || Array.isArray(layout.blocks))
            {
                this.renderDangerAlert('Поле blocks должно быть объектом');
                return;
            }
            const blocksCount = Object.keys(layout.blocks).length;
            if (blocksCount < 1 || blocksCount > 20)
            {
                this.renderDangerAlert('Количество блоков должно быть от 1 до 20');
                return;
            }
            const method = this.getMethod('set');
            const data = {
                ...this.getData(),
                layout,
            };
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderRequestError(result);
                    return;
                }
                this.renderSuccessAlert('Набор блоков установлен');
            };
            this.loading();
            BX24.callMethod(method, data, callback);
        }
        deleteAction()
        {
            const isValid = this.validateFieldsWithAlerts();
            if (!isValid)
            {
                return;
            }
            const method = this.getMethod('delete');
            const data = this.getData();
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderRequestError(result);
                    return;
                }
                this.renderSuccessAlert('Набор блоков удален');
                this.#jsonEditor.set({});
            };
            this.loading();
            BX24.callMethod(method, data, callback);
        }
        validateFieldsWithAlerts()
        {
            if (!this.validateEntityTypeIdAndEntityId())
            {
                return false;
            }
            const itemId = this.getItemId();
            if (!Number.isInteger(itemId) || itemId < 1)
            {
                alert(this.getItemTypeId() === ITEM_ACTIVITY
                    ? 'Выберите дело'
                    : 'Введите идентификатор записи таймлайна');
                this.#itemIdNode.focus();
                return false;
            }
            return true;
        }
        validateEntityTypeIdAndEntityId()
        {
            const entityId = this.getEntityId();
            if (!Number.isInteger(entityId) || entityId < 1)
            {
                alert('Введите идентификатор объекта CRM');
                this.#entityIdNode.focus();
                return false;
            }
            if (!ALLOWED_ITEM_TYPES.includes(this.getItemTypeId()))
            {
                alert('Выберите, куда добавить блоки');
                this.#itemTypeIdNode.focus();
                return false;
            }
            return true;
        }
        getData()
        {
            return {
                entityTypeId: this.getEntityTypeId(),
                entityId: this.getEntityId(),
                [this.getItemFieldName()]: this.getItemId(),
            };
        }
        getMethod(method)
        {
            return METHODS_MAP[this.getItemTypeId()][method];
        }
        getEntityTypeId()
        {
            return Number.parseInt(this.#entityTypeIdNode.value, 10);
        }
        getEntityId()
        {
            return Number.parseInt(this.#entityIdNode.value, 10);
        }
        getItemTypeId()
        {
            return Number.parseInt(this.#itemTypeIdNode.value, 10);
        }
        getItemId()
        {
            return Number.parseInt(this.#itemIdNode.value, 10);
        }
        getItemFieldName()
        {
            return METHODS_MAP[this.getItemTypeId()].itemField;
        }
        renderAlert(message, classList)
        {
            const alert = document.createElement('div');
            alert.className = classList;
            alert.setAttribute('role', 'alert');
            const time = (new Date()).toLocaleTimeString();
            alert.innerText = `[${time}] ${message}`;
            this.#statusContainer.innerHTML = '';
            this.#statusContainer.append(alert);
        }
        renderDangerAlert(message)
        {
            this.renderAlert(message, 'alert alert-danger');
        }
        renderRequestError(result, prefix = 'Ошибка запроса')
        {
            const error = result.error();
            const description = error?.ex?.error_description
                ?? error?.ex?.error
                ?? error?.status
                ?? 'Неизвестная ошибка';
            this.renderDangerAlert(`${prefix}: ${description}`);
        }
        renderSuccessAlert(message)
        {
            this.renderAlert(message, 'alert alert-success');
        }
    }
    class ContentBlockPreset
    {
        #title;
        #value;
        constructor(title, value) {
            this.#title = title;
            this.#value = value;
        }
        getTitle(){ return this.#title; }
        getValue(){ return this.#value; }
    }
    const presets = [
        new ContentBlockPreset('Текст', {
            type: "text",
            properties: {
                value: "Здравствуйте!\nМы начинаем.",
                multiline: true,
                bold: true,
                color: "base_90"
            }
        }),
        new ContentBlockPreset('Большой текст', {
            type: "largeText",
            properties: {
                value: "Здравствуйте!\nМы начинаем.\nМы продолжаем.\nМы все еще работаем над этим.\nМы продолжаем.\nМы близки к результату.\nДо свидания."
            }
        }),
        new ContentBlockPreset('Ссылка', {
            type: "link",
            properties: {
                text: "Открыть сделку",
                action: {
                    type: "redirect",
                    uri: "/crm/deal/details/123/"
                },
                bold: true
            }
        }),
        new ContentBlockPreset('Блок с заголовком', {
            type: "withTitle",
            properties: {
                title: "Заголовок",
                block: {
                    type: "text",
                    properties: {
                        value: "Какое-то значение"
                    }
                }
            }
        }),
        new ContentBlockPreset('Заголовок и ссылка в строке', {
            type: "withTitle",
            properties: {
                title: "Заголовок 2",
                block: {
                    type: "link",
                    properties: {
                        text: "Открыть сделку",
                        action: {
                            type: "redirect",
                            uri: "/crm/deal/details/123/"
                        }
                    }
                },
                inline: true
            }
        }),
        new ContentBlockPreset('Строка блоков', {
            type: "lineOfBlocks",
            properties: {
                blocks: {
                    text: {
                        type: "text",
                        properties: {
                            value: "Какой-то текст"
                        }
                    },
                    link: {
                        type: "link",
                        properties: {
                            text: "ссылка",
                            action: {
                                type: "redirect",
                                uri: "/crm/deal/details/123/"
                            }
                        }
                    },
                    boldText: {
                        type: "text",
                        properties: {
                            value: "жирный текст",
                            bold: true
                        }
                    }
                }
            }
        }),
        new ContentBlockPreset('Срок', {
            type: "deadline",
            properties: {
                readonly: false
            }
        }),
    ];
    document.addEventListener('DOMContentLoaded', () => {
        BX24.init(() => {
            const alertContainer = document.getElementById('alert_container');
            const jsonEditor = new JSONEditor(document.getElementById('json_editor'), {
                mode: 'code',
            });
            new ConfigurableTimelineBlocks(
                jsonEditor,
                alertContainer,
                presets,
            );
        });
    });
</script>
</body>
</html>
```

## Что важно учитывать

При работе учитывайте ограничения:

- для записи таймлайна выбирайте конфигурируемую запись — запись, которая поддерживает дополнительные блоки приложения. Установить блоки в дело, [лог-запись таймлайна](../logmessage/index.md) для второстепенного события или устаревшую запись [методами crm.timeline.layout.blocks.*](./index.md) нельзя
- для дела метод [crm.activity.layout.blocks.set](../activities/layout-blocks/crm-activity-layout-blocks-set.md) нельзя применить к [конфигурируемому делу приложения](../activities/configurable/index.md) и делу устаревшего типа
- кнопка **Удалить** удаляет набор сразу, без дополнительного подтверждения

## Проверим результат {#check-result}

1. Выберите тип и укажите идентификатор объекта CRM
2. Выберите, куда добавить блоки:
   - **Дело** — нажмите **Найти** и выберите дело из списка
   - **Запись таймлайна** — введите сохраненный `timelineId` созданного комментария
3. Добавьте в редактор один или несколько готовых блоков
4. Нажмите **Установить**. Приложение покажет сообщение `Набор блоков установлен`
5. Откройте карточку элемента CRM. У выбранного дела или записи таймлайна должны появиться добавленные блоки
6. Вернитесь в приложение и нажмите **Получить**. В редакторе должен появиться установленный JSON
7. Нажмите **Удалить**, затем обновите карточку CRM. Набор должен исчезнуть из таймлайна

## Если приложение вернуло ошибку

- если смарт-процессы не появились в поле **Объект CRM**, проверьте административный доступ к CRM. Стандартные типы можно использовать без загрузки смарт-процессов
- если после нажатия **Найти** список пуст, проверьте идентификатор элемента CRM и наличие связанных дел
- если запрос вернул ошибку доступа, проверьте, что страница открыта внутри установленного приложения со scope [`crm`](../../../scopes/permissions.md) и у пользователя есть права на выбранный элемент CRM
- если методы записи таймлайна вернули ошибку, проверьте `entityTypeId`, `entityId`, `timelineId` и тип записи. Блоки можно установить только в подходящую конфигурируемую запись
- если редактор сообщил об ошибке JSON, исправьте структуру и убедитесь, что поле `blocks` содержит от 1 до 20 блоков

## Продолжите изучение

- [Дополнительные контентные блоки таймлайна](./index.md)
- [Дополнительные контентные блоки дел](../activities/layout-blocks/index.md)
- [Структура дополнительного контента RestAppLayoutDto](../activities/configurable/structure/rest-app-layout-dto.md)
