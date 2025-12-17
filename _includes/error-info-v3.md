### Возвращаемая информация об ошибке

#|
|| **Название**
`тип` | **Описание** ||
|| **error.code**
`string`| Строковый код ошибки. Используйте для идентификации типа исключения ||
|| **error.message**
`string`| Текстовое описание ошибки ||
|| **error.validation**
`array`| Массив c деталями ошибки. Присутствует только в ошибках валидации данных `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION` ||
|| **error.validation[].field**
`string`| Название поля, в котором возникла ошибка валидации ||
|| **error.validation[].message**
`string`| Описание ошибки, связанной с указанным полем ||
|#
