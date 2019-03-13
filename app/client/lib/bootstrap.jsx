import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faCamera, faPenFancy, faEye, faInfoCircle, faPlus,
  faDraftingCompass, faCode, faTrashAlt, faKey, faAngleLeft, faQuestion,
  faExternalLinkAlt, faAngleRight, faSave, faSignInAlt, faUnlock, faAt,
  faLock, faCogs, faSignOutAlt, faCopy, faCheck, faPenNib, faWindowClose,
  faSignature, faImage, faFile, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/united/bootstrap.min.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import '../assets/styles/theme.scss'

library.add(faCamera, faEye, faPenFancy, faInfoCircle, faDraftingCompass, faEdit, faCode, faPlus,
  faKey, faAngleLeft, faExternalLinkAlt, faAngleRight, faTrashAlt, faSave, faCogs, faLock, faUnlock,
  faCheck, faSignature, faImage, faPenNib, faFile, faCheckCircle, faCopy, faTimes, faSignInAlt, faAt,
  faSignOutAlt, fab, faQuestion, faWindowClose)
