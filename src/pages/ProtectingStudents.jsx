import './Pages.css';
import { Typography, Divider, CircularProgress, Button } from '@mui/material';
import {
    CBPVehicle,
    ICEVehicle
} from '../assets/images'
import {
    FrontOfficeFlowchartPDF,
    StudentFlowchartPDF,
    StudentInformationRequestFlowchartPDF,
    TeacherFlowchartPDF
} from '../assets/documents'
import { useEffect, useState } from 'react';

export const ProtectingStudents = ({language, setFocusedCenter, setFocusedZoom, setFocusedAlertId}) =>{
    setFocusedCenter(null);
    setFocusedZoom(null);
    setFocusedAlertId(null);

    const BulletList = ({listData}) => {
    return (
        <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2 }}>
            {listData.map((item) => (
                <li key={item.id}>
                    {item.text}
                    {item.subText && (
                        <ul>
                        {item.subText.map((sub, index) => (
                            <li key={index}>{sub}</li>
                        ))}
                        </ul>
                    )}
                </li>
            ))}
        </Typography>
    );
    }

    const details = {
        partOne: {
            titleEN: 'Students',
            titleES: 'Estudiantes',
            textEN: [
                    {id: 1, text: 'You have the right to attend public schools regardless of immigration status'},
                    {id: 2, text: 'Immigration enforcement officers may be denied access to nonpublic areas of a school site (such as classrooms or offices) without a valid judicial warrant (signed by a judge), judicial subpoena, or a court order'},
                    {id: 3, text: 'Schools cannot share your records or family information with these officers unless:', subText: [
                        'Your parent or guardian gives written consent (if you are younger than 18) OR',
                        'You give your own written consent (if you are 18+ or an eligible student under FERPA) OR',
                        'The officers present a valid judicial warrant, judicial subpoena, or a court order OR',
                        'Disclosure is otherwise required by law'
                    ]}
            ],
            textES: [
                    {id: 1, text: 'Usted tiene derecho a asistir a escuelas públicas independientemente de su estatus migratorio'},
                    {id: 2, text: 'Se puede denegar el acceso a los agentes de control de inmigración a las áreas no públicas de un recinto escolar (tales como aulas u oficinas) si no presentan una orden judicial válida (firmada por un juez), una citación judicial o una orden de un tribunal'},
                    {id: 3, text: 'Las escuelas no pueden compartir sus expedientes ni la información de su familia con dichos agentes, a menos que:', subText: [
                        'Su padre, madre o tutor otorgue su consentimiento por escrito (si usted es menor de 18 años) O',
                        'Usted otorgue su propio consentimiento por escrito (si tiene 18 años o más, o si es un estudiante elegible según la ley FERPA) O',
                        'Los agentes presenten una orden judicial válida, una citación judicial o una orden de un tribunal O',
                        'La divulgación sea requerida por la ley por cualquier otro motivo'
                    ]}
            ],
        },
        partTwo: {
            titleEN: 'Teachers & staff',
            titleES: 'Maestros & personal',
            textEN: [
                    {id: 1, text: 'You should notify school admin immediately if immigration enforcement officers are on campus and follow district or administrator instructions'},
                    {id: 2, text: 'These officers may be denied access to nonpublic areas of a school site (such as classrooms or offices) without a valid judicial warrant (signed by a judge), judicial subpoena, or a court order'},
                    {id: 3, text: 'You cannot share student records or family information with these officers unless:', subText: [
                        'The student\'s parent or guardian gives written consent (if the student is younger than 18) OR',
                        'The student gives their own written consent (if they are 18+ or an eligible student under FERPA) OR',
                        'The officers present a valid judicial warrant, judicial subpoena, or a court order OR',
                        'Disclosure is otherwise required by law'
                    ]}
            ],
            textES: [
                    {id: 1, text: 'Debe notificar de inmediato al personal administrativo de la escuela si hay agentes de control de inmigración en el recinto escolar, y seguir las instrucciones del distrito o de la administración'},
                    {id: 2, text: 'A estos agentes se les puede denegar el acceso a las áreas no públicas de las instalaciones escolares (tales como aulas u oficinas) si no presentan una orden judicial válida (firmada por un juez), una citación judicial o una orden del tribunal'},
                    {id: 3, text: 'No puede compartir expedientes de los estudiantes ni información familiar con estos agentes, a menos que:', subText: [
                        'El padre, madre o tutor del estudiante otorgue su consentimiento por escrito (si el estudiante es menor de 18 años) O',
                        'El propio estudiante otorgue su consentimiento por escrito (si tiene 18 años o más, o si es un estudiante elegible según la ley FERPA) O',
                        'Los agentes presenten una orden judicial válida, una citación judicial o una orden del tribunal O',
                        'La divulgación sea requerida por la ley por cualquier otro motivo'
                    ]}
            ],
        },
        partThree: {
            titleEN: 'School administration',
            titleES: 'Administración escolar',
            textEN: [
                    {id: 1, text: 'Immigration enforcement officers may be denied access to nonpublic areas of a school site (such as classrooms or offices) without a valid judicial warrant (signed by a judge), judicial subpoena, or a court order', subText: [
                        'When such documents are presented, you should review them and consult district administration or legal counsel before granting access'
                    ]},
                    {id: 2, text: 'You should request, to the extent practicable, valid identification of officers seeking to enter nonpublic areas of a school', subText: [
                        'Access to nonpublic areas may be denied if officers fail or refuse to provide identification'
                    ]},
                    {id: 3, text: 'You should limit access to only the specific areas, individuals, and records explicitly identified in valid legal documents presented'},
                    {id: 4, text: 'You should escort these officers when feasible'},
                    {id: 5, text: 'You should take reasonable steps to minimize disruption and, whenever possible, restrict officers\' presence to areas where students are not present'},
                    {id: 6, text: 'You should ensure district policies are updated and staff are trained to respond to immigration enforcement'},
                    {id: 7, text: 'You cannot share student records or family information with these officers unless:', subText: [
                        'The student\'s parent or guardian gives written consent (if the student is younger than 18) OR',
                        'The student gives their own written consent (if they are 18+ or an eligible student under FERPA) OR',
                        'The officers present a valid judicial warrant, judicial subpoena, or a court order OR',
                        'Disclosure is otherwise required by law'
                    ]}
            ],
            textES: [
                    {id: 1, text: 'Se puede denegar el acceso a los agentes de control de inmigración a las áreas no públicas de un recinto escolar (tales como aulas u oficinas) si no presentan una orden judicial válida (firmada por un juez), una citación judicial o una orden de un tribunal', subText: [
                        'Cuando se presenten dichos documentos, usted debe revisarlos y consultar con la administración del distrito o con el asesor legal antes de conceder el acceso'
                    ]},
                    {id: 2, text: 'En la medida de lo posible, usted debe solicitar una identificación válida a los agentes que pretendan ingresar a las áreas no públicas de una escuela', subText: [
                        'Se puede denegar el acceso a las áreas no públicas si los agentes no presentan su identificación o se niegan a hacerlo'
                    ]},
                    {id: 3, text: 'Usted debe limitar el acceso únicamente a las áreas específicas, las personas y los registros que se identifiquen explícitamente en los documentos legales válidos que se presenten'},
                    {id: 4, text: 'Siempre que sea factible, usted debe escoltar a dichos agentes'},
                    {id: 5, text: 'Usted debe tomar medidas razonables para minimizar las interrupciones y, siempre que sea posible, restringir la presencia de los agentes a las áreas donde no haya estudiantes presentes'},
                    {id: 6, text: 'Usted debe asegurarse de que las políticas del distrito estén actualizadas y de que el personal esté capacitado para responder ante las acciones de control de inmigración'},
                    {id: 7, text: 'No puede compartir expedientes de los estudiantes ni información familiar con estos agentes, a menos que:', subText: [
                        'El padre, madre o tutor del estudiante otorgue su consentimiento por escrito (si el estudiante es menor de 18 años) O',
                        'El propio estudiante otorgue su consentimiento por escrito (si tiene 18 años o más, o si es un estudiante elegible según la ley FERPA) O',
                        'Los agentes presenten una orden judicial válida, una citación judicial o una orden del tribunal O',
                        'La divulgación sea requerida por la ley por cualquier otro motivo'
                    ]}
            ]
        },
        partFour: {
            titleEN: 'Parents',
            titleES: 'Padres',
            textEN: [
                {id: 1, text: 'Schools cannot share your child\'s records or family information with immigration enforcement officers unless:', subText: [
                    'You give written consent (if your child is younger than 18) OR',
                    'Your child gives their own written consent (if they are 18+ or an eligible student under FERPA) OR',
                    'The officers present a valid judicial warrant, judicial subpoena, or a court order OR',
                    'Disclosure is otherwise required by law'
                ]}
            ],
            textES: [
                {id: 1, text: 'Las escuelas no pueden compartir los expedientes de su hijo ni la información familiar con los agentes de control de inmigración, a menos que:', subText: [
                    'Usted otorgue su consentimiento por escrito (si su hijo es menor de 18 años) O',
                    'Su hijo otorgue su propio consentimiento por escrito (si tiene 18 años o más, o si es un estudiante elegible conforme a la ley FERPA) O',
                    'Los agentes presenten una orden judicial válida, una citación judicial o una orden de un tribunal O',
                    'La divulgación sea requerida por la ley por cualquier otro motivo'
                ]}
            ],
        },
    }
    const [imageLoading1, setImageLoading1] = useState(true);
    const [imageLoading2, setImageLoading2] = useState(true);
    useEffect(() => {
        const img = new Image();
        img.src = CBPVehicle;
        img.onload = () => setImageLoading1(false);
        }, [CBPVehicle]);

    useEffect(() => {
        const img = new Image();
        img.src = ICEVehicle;
        img.onload = () => setImageLoading2(false);
        }, [ICEVehicle]);
    
  return (
    <div className='pageContainer'>
        <Typography variant='h4'>{language === 'EN' ? 'Protecting Students' : 'Protegiendo a los estudiantes'}</Typography>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partOne.titleEN : details.partOne.titleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partOne.textEN}/> : <BulletList listData={details.partOne.textES}/>}
        <Button href={StudentFlowchartPDF} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? 'Student flowchart (PDF)' : 'Diagrama de flujo para estudiantes (PDF)'}</Button>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partTwo.titleEN : details.partTwo.titleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partTwo.textEN}/> : <BulletList listData={details.partTwo.textES}/>}
        <Button href={TeacherFlowchartPDF} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? 'Teacher flowchart (PDF)' : 'Diagrama de flujo para maestros (PDF)'}</Button>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partThree.titleEN : details.partThree.titleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partThree.textEN}/> : <BulletList listData={details.partThree.textES}/>}
        <Button href={FrontOfficeFlowchartPDF} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? 'Front office flowchart (PDF)' : 'Diagrama de flujo de la recepción (PDF)'}</Button>
        <Button href={StudentInformationRequestFlowchartPDF} target="_blank" variant="contained" sx={{width: '100%'}}>{language === 'EN' ? 'Student information release request flowchart (PDF)' : 'Diagrama de flujo para la solicitud de divulgación de información del estudiante (PDF)'}</Button>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? details.partFour.titleEN : details.partFour.titleES}</Typography>
        {language === 'EN' ? <BulletList listData={details.partFour.textEN}/> : <BulletList listData={details.partFour.textES}/>}
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>{language === 'EN' ? 'Sources' : 'Fuentes'}</Typography>
        <Typography component="ul" sx={{ textAlign: 'left', listStyleType: 'disc', pl: 2, wordBreak: 'break-word', overflowWrap: 'break-word'}}>
            <li>“California Bill AB-49 Schoolsites: Immigration Enforcement.” Ca.gov, 22 Sept. 2025, leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB49. Accessed 10 Apr. 2026.</li>
            <li>“Governor Newsom Signs Assemblymember Muratsuchi's AB 49, the California Safe Haven Schools Act.” Asmdc.org, 21 Sept. 2025, muratsuchi.asmdc.org/press-releases/20250921-governor-newsom-signs-assemblymember-muratsuchis-ab-49-california-safe?utm_source=chatgpt.com. Accessed 11 Apr. 2026.</li>
            <li>“Safe Haven Schools Act (AB-49) - Oxnard School District.” Oxnardsd.org, 2025, www.oxnardsd.org/community/ab-49-safe-haven-schools-act?utm_source=chatgpt.com. Accessed 11 Apr. 2026.</li>
        </Typography>
    </div>
  );
}