# Как изменить или удалить номера телефонов и email

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания и изменения контактов в CRM

Данные о контактах в CRM могут содержать несколько номеров телефонов и адресов электронной почты. Иногда нужно обновить существующие значения или удалить ненужные.

Создадим контакт с несколькими email и номерами телефонов, а потом изменим эту информацию. Для этого последовательно выполним три метода:

1. [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md) — создадим контакт в CRM,

2. [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) — получим информацию о созданном контакте,

3. [crm.contact.update](../../../api-reference/crm/contacts/crm-contact-update.md) — изменим данные о email и телефонах.

## Поля crm_multifield

Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). У каждого объекта есть поля:

```javascript
{
    ID: 123, // Идентификатор существующей записи. Нужен для обновления
    TYPE_ID: "PHONE" // Тип множественного поля
    VALUE: "test@test.com", // Значение
    VALUE_TYPE: "WORK" // Тип значения
}
```

-  Для удаления значения множественного поля, передайте идентификатор `ID` и пустое значение `VALUE`. Другой вариант — укажите параметр `DELETE: 'Y'` вместо `VALUE`.

-  Для обновления значения множественного поля передайте идентификатор и новое значение.

## Пример с email

### 1. Добавляем контакт с двумя email

Для создания контакта в CRM выполним метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md). В объекте `fields` передадим поля:

-  `NAME` — имя контакта,

-  `EMAIL` — массив электронных адресов из `arNewEmail`.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для контактов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

{% endnote %}

```javascript
// подготавливаем адреса в формате crm_multifield
let arNewEmail = [
 { VALUE: 'work_email@nomail.com', VALUE_TYPE: 'WORK' },
 { VALUE: 'home_email@nomail.com', VALUE_TYPE: 'HOME' }
];

// создаем новый контакт
BX24.callMethod(
	"crm.contact.add",
	{
		fields: {
			NAME: 'Новый контакт',
			EMAIL: arNewEmail
 		}
	}
);
```

В результате получим идентификатор нового контакта, например, `25`.

```json
{
	"result": 25
}
```

### 2. Получаем контакт для редактирования

Чтобы получить информацию о созданном контакте, используем метод [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) с идентификатором `ID` из результата предыдущего запроса.

```javascript
let contactId = newContact.data().result; // сохраняем в переменную ID созданного контакта
// получаем информацию о контакте по ID
BX24.callMethod(
	"crm.contact.get",
	{
		ID: contactId
	}
);
```

В результате получим описание всех полей нового контакта.

```json
{
    "result": {
        "ID": "25",
        "NAME": "Новый контакт",
		..., // другие поля
        "EMAIL": [
            {
                "ID": "1967",
                "VALUE_TYPE": "WORK",
                "VALUE": "work_email@nomail.com",
                "TYPE_ID": "EMAIL"
            },
            {
                "ID": "1969",
                "VALUE_TYPE": "HOME",
                "VALUE": "home_email@nomail.com",
                "TYPE_ID": "EMAIL"
            }
        ]
    }
}
```

### 3. Обновляем список email

Для изменения списка email выполним метод [crm.contact.update](../../../api-reference/crm/contacts/crm-contact-update.md).

-  `ID` — идентификатор контакта,

-  `FIELDS` — массив полей, которые надо изменить. Передадим в массиве поле `EMAIL` и новые значения адресов: для первого адреса укажем новый email, а для второго — `DELETE: 'Y'`, чтобы удалить его.

```javascript
// подготовляем массив с новой информацией о email
let arUpdateEmail = [
 { ID: contactData.EMAIL[0].ID, VALUE: 'new_work_email@example.com' }, // меняем значение для первого email
 { ID: contactData.EMAIL[1].ID, 'DELETE': 'Y' } // удаляем второе значение
];

// обновляем контакт
BX24.callMethod(
	"crm.contact.update",
	{
		ID: contactId,
		FIELDS: {
			EMAIL: arUpdateEmail
		}
	}
);
```

При успешном обновлении метод вернет `true`.

```json
{
    "result": true,
}
```

### Полный пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    let arNewEmail = [
        {
            'VALUE': 'work_email@nomail.com',
            'VALUE_TYPE': 'WORK'
        },
        {
            'VALUE': 'home_email@nomail.com',
            'VALUE_TYPE': 'HOME'
        }
    ];

    // Шаг 1: Создаем контакт
    BX24.callMethod(
        "crm.contact.add",
        {
            fields: {
                'NAME': 'Новый контакт',
                'EMAIL': arNewEmail
            }
        },
        function(newContact) {
            if (newContact.error()) {
                console.error('Ошибка создания контакта: ' + newContact.error_description());
            } else {
                let contactId = newContact.data().result;

                // Шаг 2: Получаем данные контакта
                BX24.callMethod(
                    "crm.contact.get",
                    {
                        ID: contactId
                    },
                    function(newContactData) {

                        // Проверяем наличие email
                        if (newContactData.data().result.EMAIL?.length >= 2) {
                            let contactData = newContactData.data().result;

                            // Шаг 3: Формируем обновление email
                            let arUpdateEmail = [
                                {
                                    'ID': contactData.EMAIL[0].ID,
                                    'VALUE': 'new_work_email@example.com'
                                },
                                {
                                    'ID': contactData.EMAIL[1].ID,
                                    'DELETE': 'Y'
                                }
                            ];

                            // Обновляем контакт
                            BX24.callMethod(
                                "crm.contact.update",
                                {
                                    ID: contactId,
                                    FIELDS: {
                                        'EMAIL': arUpdateEmail
                                    }
                                },
                                function(resultContactChange) {
                                    if (resultContactChange.error()) {
                                        console.error('Ошибка обновления контакта:', resultContactChange.error());
                                    } else {
                                        console.log('Контакт успешно обновлен');
                                    }
                                }
                            );
                        } else {
                            console.warn('Не найдено достаточно email для обновления.');
                        }
                    }
                );
            }
        }
    );
    ```

- PHP

    ```php
    <?php
    require_once('crest.php');

    // Формируем массив email в формате multifield
    $newEmail = [
        ['VALUE' => 'work_email@nomail.com', 'VALUE_TYPE' => 'WORK'],
        ['VALUE' => 'home_email@nomail.com', 'VALUE_TYPE' => 'HOME']
    ];

    // Создаем контакт
    $newContact = CRest::call('crm.contact.add', [
        'fields' => [
            'NAME' => 'Новый контакт',
            'EMAIL' => $newEmail
        ]
    ]);

    if (!empty($newContact['result'])) {
        $contactId = $newContact['result'];

        // Шаг 2: Получаем данные о контакте
        $contactData = CRest::call('crm.contact.get', ['ID' => $contactId]);

        if (!empty($contactData['result']['EMAIL'][0]) && !empty($contactData['result']['EMAIL'][1])) {
            // Шаг 3: Формируем обновление email
            $updateEmail = [
                ['ID' => $contactData['result']['EMAIL'][0]['ID'], 'VALUE' => 'new_work_email@example.com',
                ['ID' => $contactData['result']['EMAIL'][1]['ID'], 'DELETE' => 'Y'] // Удаляем второй email
            ];

            // Обновляем контакт
            $changeResult = CRest::call('crm.contact.update', [
                'ID' => $contactId,
                'FIELDS' => ['EMAIL' => $updateEmail]
            ]);

            if (!empty($changeResult['error'])) {
                echo 'Ошибка обновления контакта: ' . $changeResult['error_description'];
            } else {
                echo 'Контакт успешно обновлен.';
            }
        } else {
            echo 'Не найдены email для обновления.';
        }
    } else {
        echo 'Ошибка создания контакта: ' . $newContact['error_description'];
    }
    ?>
    ```

{% endlist %}

## Пример с телефонными номерами

Аналогично можно обновить список телефонов контакта `PHONE`.

### 1. Добавляем контакт с двумя телефонами

Для создания контакта в CRM выполним метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md). В объекте `fields` передадим поля:

-  `NAME` — имя контакта,

-  `PHONE` — массив телефонов  из `arNewPhone`.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для контактов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

{% endnote %}

```javascript
// подготавливаем телефоны в формате crm_multifield
let arNewPhone = [
	{ VALUE: '89991234567', VALUE_TYPE: 'WORK' },
	{ VALUE: '89997654321', VALUE_TYPE: 'HOME' }
];
// создаем новый контакт
BX24.callMethod(
	"crm.contact.add",
	{
		fields: {
			NAME: 'Новый контакт',
			PHONE: arNewPhone
		}
	}
);
```

В результате получим идентификатор нового контакта, например, `25`.

```json
{
	"result": 25
}
```

### 2. Получаем контакт для редактирования

Чтобы получить информацию о созданном контакте контакте используем метод [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) с идентификатором `ID`, который получили в предыдущем запросе.

```javascript
let contactId = newContact.data().result; // сохраняем в переменную ID созданного контакта
// получаем информацию о контакте по ID
BX24.callMethod(
	"crm.contact.get",
	{
		ID: contactId
	}
);
```

В результате получим описание всех полей нового контакта.

```json
{
    "result": {
        "ID": "25",
        "NAME": "Новый контакт",
		..., // другие поля
        "PHONE": [
            {
                "ID": "1971",
                "VALUE_TYPE": "WORK",
                "VALUE": "89991234567",
                "TYPE_ID": "PHONE"
            },
            {
                "ID": "1973",
                "VALUE_TYPE": "HOME",
                "VALUE": "89997654321",
                "TYPE_ID": "PHONE"
            }
        ]
    }
}
```

### 3. Обновляем список телефонов

Для изменения списка email выполним метод [crm.contact.update](../../../api-reference/crm/contacts/crm-contact-update.md).

-  `ID` — идентификатор контакта,

-  `FIELDS` — массив полей, которые надо изменить. Передадим в массиве поле `PHONE` и новые значения телефонов: для первого телефона укажем новое значение, а для второго — пустое значение, чтобы удалить.

```javascript
// подготовляем массив с новой информацией о телефонах
let arUpdatePhone = [
	{ ID: contactData.PHONE[0].ID, VALUE: '81119876541' },
	{ ID: contactData.PHONE[1].ID, VALUE: '' }
 ];
// обновляем контакт
BX24.callMethod(
	"crm.contact.update",
	{
		ID: contactId,
		FIELDS: {
			PHONE: arUpdatePhone
		}
	}
);
```

При успешном обновлении метод вернет `true`.

```json
{
    "result": true,
}
```

### Полный пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    let arNewPhone = [
        { VALUE: '89991234567', VALUE_TYPE: 'WORK' },
        { VALUE: '89997654321', VALUE_TYPE: 'HOME' }
    ];

    // Шаг 1: Создаем контакт
    BX24.callMethod(
        "crm.contact.add",
        {
            fields: {
                NAME: 'Новый контакт',
                PHONE: arNewPhone
            }
        },
        function(newContact) {
            if (newContact.error()) {
                console.error('Ошибка создания контакта: ' + newContact.error_description());
            } else {
                let contactId = newContact.data().result;

                // Шаг 2: Получаем данные контакта
                BX24.callMethod(
                    "crm.contact.get",
                    {
                        ID: contactId
                    },
                    function(contactData) {

                        // Проверяем наличие телефонов
                        if (contactData.data().result.PHONE?.length >= 2) {
                            let phoneData = contactData.data().result;

                            // Шаг 3: Формируем обновление телефонов
                            let arUpdatePhone = [
                                {
                                    ID: phoneData.PHONE[0].ID,
                                    VALUE: '81119876541'
                                },
                                {
                                    ID: phoneData.PHONE[1].ID,
                                    VALUE: ''
                                }
                            ];

                            // Обновляем контакт
                            BX24.callMethod(
                                "crm.contact.update",
                                {
                                    ID: contactId,
                                    FIELDS: {
                                        PHONE: arUpdatePhone
                                    }
                                },
                                function(resultContactChange) {
                                    if (resultContactChange.error()) {
                                        console.error('Ошибка обновления контакта:', resultContactChange.error());
                                    } else {
                                        console.log('Контакт успешно обновлен');
                                    }
                                }
                            );
                        } else {
                            console.warn('Не найдено достаточного количества телефонов.');
                        }
                    }
                );
            }
        }
    );
    ```

- PHP

    ```php
    <?php
    require_once('crest.php');

    // Формируем массив телефонов в формате multifield
    $newPhone = [
        ['VALUE' => '89991234567', 'VALUE_TYPE' => 'WORK'],
        ['VALUE' => '89997654321', 'VALUE_TYPE' => 'HOME']
    ];

    // Создаем контакт
    $newContact = CRest::call('crm.contact.add', [
        'fields' => [
            'NAME' => 'Новый контакт',
            'PHONE' => $newPhone
        ]
    ]);

    if (!empty($newContact['result'])) {
        $contactId = $newContact['result'];

        // Шаг 2: Получаем данные о контакте
        $contactData = CRest::call('crm.contact.get', ['ID' => $contactId]);

        if (!empty($contactData['result']['PHONE'][0]) && !empty($contactData['result']['PHONE'][1])) {
            // Шаг 3: Формируем обновление телефонов
            $updatePhone = [
                ['ID' => $contactData['result']['PHONE'][0]['ID'], 'VALUE' => '81119876541'],
                ['ID' => $contactData['result']['PHONE'][1]['ID'], 'VALUE' => ''] // Удаляем второй телефон
            ];

            // Обновляем контакт
            $changeResult = CRest::call('crm.contact.update', [
                'ID' => $contactId,
                'FIELDS' => ['PHONE' => $updatePhone]
            ]);

            if (!empty($changeResult['error'])) {
                echo 'Ошибка обновления контакта: ' . $changeResult['error_description'];
            } else {
                echo 'Контакт успешно обновлен.';
            }
        } else {
            echo 'Не найдены телефоны для обновления.';
        }
    } else {
        echo 'Ошибка создания контакта: ' . $newContact['error_description'];
    }
    ?>
    ```

{% endlist %}
