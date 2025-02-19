import Ajv from "ajv";
import addFormats from "ajv-formats";

import * as schema_new_part from "./Schemas/Parts/schema_new_parts.json";
import * as schema_new_parameter from "./Schemas/Parts/schema_new_param.json";
import * as schema_part_query from "./Schemas/Parts/schema_part_query.json";
import * as schema_new_category from "./Schemas/Categories/schema_new_category.json";
import * as schema_category_query from "./Schemas/Categories/schema_category_query.json";

export const ajv = new Ajv();
addFormats(ajv);

ajv.addSchema(schema_new_part, "POST /parts");
ajv.addSchema(schema_new_part, "PUT /parts");
ajv.addSchema(schema_part_query, "GET /parts");
ajv.addSchema(schema_new_parameter, "POST /parameters");
ajv.addSchema(schema_new_category, "POST /categories");
ajv.addSchema(schema_category_query, "GET /categories");
