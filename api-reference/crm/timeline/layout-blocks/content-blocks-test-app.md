# Пример приложения с дополнительными контентными блоками

```php
<?php
    header('Content-Type: text/html; charset=UTF-8');
    $placementOptions = json_decode($_REQUEST['PLACEMENT_OPTIONS'] ?? '', true);
    $forceMode = ($placementOptions['force_mode'] ?? null) === 'Y';
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/jsoneditor@9.9.2/dist/jsoneditor.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/jsoneditor@9.9.2/dist/jsoneditor.min.css" rel="stylesheet">
    <script src="//api.bitrix24.com/api/v1/"></script>
</head>
<body>
    <div class="container-fluid">
        <form id="form" class="mt-3 md-3">
            <div class="row">
                <div class="col-8">
                    <div class="mb-3">
                        <div class="d-flex flex-row gap-3">
                            <label class="form-label h3">Layout JSON</label>
                            <div id="content_block_presets" class="d-flex flex-row gap-2"></div>
                        </div>
                        <div id="json_editor" style="height: 510px"></div>
                        <input type="hidden" id="layout" value="{}">
                    </div>
                </div>
                <div class="col-4" id="parameters">
                    <label class="form-label h3">Параметры</label>
                    <hr class="mt-0">
                    <div class="vstack gap-3">
                        <div class="form-group">
                            <label for="entity_type_id">Родительская сущность</label>
                            <select id="entity_type_id" name="entityTypeId" class="form-select">
                                <option value="2" selected>[2] Сделка</option>
                                <option value="1">[1] Лид</option>
                                <option value="3">[3] Контакт</option>
                                <option value="4">[4] Компания</option>
                                <option value="7">[7] Предложение</option>
                                <option value="31">[31] Счёт </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="entity_id">ID родительской сущности</label>
                            <input id="entity_id" name="entityId" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="item_type_id" class="text-truncate">Добавляем конфигурируемые блоки в:</label>
                            <select name="itemTypeId" id="item_type_id" class="form-select" required>
                                <option value="1" selected>Дело</option>
                                <option value="2">Запись таймлайна</option>
                            </select>
                        </div>
                        <?php if (!$forceMode): ?>
                            <button id="get_items_button" type="button" class="btn btn-outline-dark btn-sm">Найти</button>
                        <?php endif; ?>
                        <div class="form-group">
                            <label for="item_id">Дело:</label>
                            <?php if ($forceMode): ?>
                                <input id="item_id" name="itemId" type="text" class="form-control">
                            <?php else: ?>
                                <select name="itemId" id="item_id" class="form-select"></select>
                            <?php endif; ?>
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
</body>
</html>
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
        #isForceMode = false;
        // fields
        #entityTypeIdNode;
        #entityIdNode;
        #itemTypeIdNode;
        #itemIdNode;
        // buttons
        #getButton;
        #setButton;
        #deleteButton;
        #getItemsButton
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
            this.#getItemsButton = !this.#isForceMode ? document.getElementById('get_items_button') : null;
        }
        bindEvents() {
            this.#getButton.onclick = this.getAction.bind(this);
            this.#setButton.onclick = this.setAction.bind(this);
            this.#deleteButton.onclick = this.deleteAction.bind(this);
            if (this.#getItemsButton)
            {
                this.#getItemsButton.onclick = this.getItemsAction.bind(this);
                this.#itemTypeIdNode.onchange = () => {
                    this.#itemIdNode.innerHTML = '';
                    const label = document.querySelector(`[for="item_id"]`);
                    label.textContent = this.getItemTypeId() === ITEM_ACTIVITY ? 'Дело' : 'Запись таймлайна';
                };
            }
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
                    let json = this.#jsonEditor.get();
                    if (!json.blocks) {
                        json.blocks = {};
                    }
                    const length = Object.keys(json?.blocks).length;
                    json.blocks[`${length + 1}`] = contentBlockPreset.getValue();
                    this.#jsonEditor.set(json);
                    return false;
                };
                contentBlockPresetsContainer.append(button);
            });
            const clearButton = document.createElement('button');
            clearButton.innerText = 'Clear';
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
                const types = result?.answer?.result?.types || [];
                types.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.entityTypeId;
                    option.innerText = `[${item.id}] ${item.title}`;
                    this.#entityTypeIdNode.append(option);
                })
            });
        }
        loading()
        {
            this.#entityTypeIdNode.disabled = true;
            this.#entityIdNode.disabled = true;
            this.#itemTypeIdNode.disabled = true;
            this.#itemIdNode.disabled = true;
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
            this.#getButton.disabled = false;
            this.#setButton.disabled = false;
            this.#deleteButton.disabled = false;
        }
        getItemsAction()
        {
            if (this.#isForceMode)
            {
                return;
            }
            if (!this.validateEntityTypeIdAndEntityId())
            {
                return;
            }
            if (this.getItemTypeId() === ITEM_ACTIVITY)
            {
                const data = {
                    select: ['*'],
                    filter: {
                        'OWNER_TYPE_ID': this.getEntityTypeId(),
                        'OWNER_ID': this.getEntityId(),
                    },
                };
                const callback = (result) => {
                    if (result.error())
                    {
                        this.renderDangerAlert(result.error());
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
                BX24.callMethod('crm.activity.list', data, callback);
                return;
            }
            const data = {
                select: ['*'],
                filter: {
                    'bindings': {
                        'entityTypeId': this.getEntityTypeId(),
                        'entityId': this.getEntityId(),
                    },
                },
            };
            const callback = (result) => {
                if (result.error())
                {
                    this.renderDangerAlert(result.error());
                    return;
                }
                const items = result.data().items;
                items.forEach((item) => {
                    let option = document.createElement('option');
                    const title = item?.layout?.header?.title ?? 'Undefined';
                    const id = item.id;
                    option.value = id;
                    option.innerText = `[${id}] ${title}`;
                    this.#itemIdNode.append(option);
                });
            };
            BX24.callMethod('crm.timeline.historyitem.list', data, callback);
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
                    this.renderDangerAlert(result.error());
                    return;
                }
                this.#jsonEditor.set(result.data().layout ?? {});
                this.renderSuccessAlert("Готово, результат чуть выше ;)");
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
            const method = this.getMethod('set');
            const data = {
                ...this.getData(),
                layout: this.#jsonEditor.get(),
            };
            const callback = (result) => {
                this.stopLoading();
                if (result.error())
                {
                    this.renderDangerAlert(result.error());
                    return;
                }
                this.renderSuccessAlert("Дополнительные контентные блоки успешно установлены ;)");
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
                    this.renderDangerAlert(result.error());
                    return;
                }
                this.renderSuccessAlert("Дополнительные контентные блоки успешно удалены ;)");
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
            if (!itemId)
            {
                alert('Введите ID Дела/Записи таймлайна');
                this.#itemIdNode.focus();
                return false;
            }
            return true;
        }
        validateEntityTypeIdAndEntityId()
        {
            const entityId = this.getEntityId();
            if (!entityId)
            {
                alert('Введите ID Родительской сущности');
                this.#entityIdNode.focus();
                return false;
            }
            if (!ALLOWED_ITEM_TYPES.includes(this.getItemTypeId()))
            {
                alert('Выберите корректное значение для типа сущности к которой будут добавлены конфигурационные блоки');
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
        renderSuccessAlert(message)
        {
            this.renderAlert(message, 'alert alert-success')
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
        new ContentBlockPreset('Text', {
            type: "text",
            properties: {
                value: "Здравствуйте!\nМы начинаем.",
                multiline: true,
                bold: true,
                color: "base_90"
            }
        }),
        new ContentBlockPreset('Large text', {
            type: "largeText",
            properties: {
                value: "Здравствуйте!\nМы начинаем.\nМы продолжаем.\nМы все еще работаем над этим.\nМы продолжаем.\nМы близки к результату.\nДо свидания."
            }
        }),
        new ContentBlockPreset('Link', {
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
        new ContentBlockPreset('With title', {
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
        new ContentBlockPreset('With title (inline)', {
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
        new ContentBlockPreset('Line of blocks', {
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
        new ContentBlockPreset('Deadline', {
            type: "deadline",
            properties: {
                readonly: false
            }
        }),
    ];
    document.addEventListener("DOMContentLoaded", () => {
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
</script>
```